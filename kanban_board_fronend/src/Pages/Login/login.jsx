import React, { useEffect, useState } from "react";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

import "./login.css";
import KanbanBoardImage from "../../assets/kanban.png";

const loginUrl = "http://127.0.0.1:8000/kanbanBoards/login/";
const registerUrl = "http://127.0.0.1:8000/kanbanBoards/register/";

const Login = () => {
  const [wrongPass, setWrongPass] = useState(false);
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();

  const checkLogin = async (event) => {
    event.preventDefault();
    event.preventDefault();
    const jsonObj = {
      user_email: event.target.loginEmail.value,
      user_password: generateHash(event.target.password.value),
    };
    console.log(jsonObj);
    const reponse = await fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({
        user_email: event.target.loginEmail.value,
        user_password: generateHash(event.target.password.value),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await reponse.json();
    if (result != "Failed") {
      setWrongPass(false);
      const url = "/allBoards/" + result.user_id;
      navigate(url);
    } else {
      setWrongPass(true);
    }
  };

  const checkRegister = async (event) => {
    event.preventDefault();
    const jsonObj = {
      user_email: event.target.loginEmail.value,
      user_password: generateHash(event.target.password.value),
      user_name: event.target.username.value,
    };
    console.log(jsonObj);
    const reponse = await fetch(registerUrl, {
      method: "POST",
      body: JSON.stringify({
        user_email: event.target.loginEmail.value,
        user_password: generateHash(event.target.password.value),
        user_name: event.target.username.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    event.target.loginEmail.value = "";
    event.target.username.value = "";
    event.target.password.value = "";
    const result = await reponse.json();
    if (result != "Failed") {
      setRegister(false);
      navigate("/");
    } else {
      setWrongPass(true);
    }
  };

  useEffect(() => {
    generateHash();
  }, []);

  const generateHash = (password) => {
    const gen = crypto.MD5(password).toString();
    return gen;
  };

  return (
    <React.Fragment>
      <div className="loginBackground">
        <div className="loginCard">
          <div className="loginBorder">
            <img className="kanbanBoardImage" src={KanbanBoardImage} />
            <div className="loginHeader"> Kanban Board </div>
            <form
              onSubmit={
                (!register && checkLogin) || (register && checkRegister)
              }
            >
              <div className="loginInputFields">
                {register && (
                  <input
                    type="text"
                    className="loginInput"
                    placeholder="Username"
                    name="username"
                  />
                )}
                <input
                  type="email"
                  className="loginInput"
                  placeholder="Email ID"
                  name="loginEmail"
                />
                <input
                  type="password"
                  className="loginInput"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <button className="loginButton">
                {register == false ? "Login" : "Register"}
              </button>
              {wrongPass && (
                <div className="wrongError"> Incorrect Credentials! </div>
              )}
            </form>
            {
              <button
                className="registerButton"
                onClick={() => {
                  setWrongPass(false)
                  (!register && setRegister(true)) || (register && setRegister(false))
                }}
              >
                {!register && "Register"}
                {register && "Login"}
              </button>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
