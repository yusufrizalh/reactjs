import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userRegistration = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8002/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column">
          <form onSubmit={userRegistration} className="box">
            <p className="has-text-centered">{message}</p>
            <div className="field mt-5">
              <label className="label">Name</label>
              <div className="controls">
                <input
                  type="text"
                  className="input"
                  placeholder="Please enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
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
              <label className="label">Confirm Password</label>
              <div className="controls">
                <input
                  type="password"
                  className="input"
                  placeholder="Please enter your confirm password"
                  value={confPassword}
                  onChange={(event) => setConfPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="field mt-5">
              <button className="button is-primary is-fullwidth">
                Register User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
