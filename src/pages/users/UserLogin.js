import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8002/login", {
        email: email,
        password: password,
      });
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column">
          <form onSubmit={userLogin} className="box">
            <p className="has-text-centered">{message}</p>
            <div className="field mt-5">
              <label className="label">Email</label>
              <div className="controls">
                <input
                  type="text"
                  className="input"
                  placeholder="Please enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="field mt-5">
              <label className="label">Password</label>
              <div className="controls">
                <input
                  type="password"
                  className="input"
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="field mt-5">
              <button className="button is-primary is-fullwidth">
                Login User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
