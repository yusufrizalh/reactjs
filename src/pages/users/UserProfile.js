import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8002/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/register");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptor.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:8002/token");
        config.headers.Authorization = `Output: ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:8002/users", {
      headers: {
        Authorization: `Output: ${token}`,
      },
    });
    setUsers(response.data);
  };

  return (
    <div className="container mt-5 py-5">
      <h3>Welcome, {name}</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cum error
        nesciunt totam earum! Eaque, sunt eos recusandae provident laboriosam
        iste nam error. Soluta, adipisci? Laudantium facere sit fugit dolor?
      </p>
    </div>
  );
};

export default UserProfile;
