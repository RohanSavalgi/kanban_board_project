import React, { useEffect } from "react";
import crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

import "./login.css";
import KanbanBoardImage from "../../assets/kanban.png";

const loginUrl = "http://127.0.0.1:8000/kanbanBoards/auth/";

const Login = () => {
  const navigate = useNavigate();
  
  const checkLogin = async (event) => {
    event.preventDefault();
    console.log(event.target.loginEmail.value);
    console.log(event.target.password.value);
    
    const reponse = await fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({
        user_email: event.target.loginEmail.value,
        user_password: generateHash(event.target.password.value)
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await reponse.json();
    // console.log(result.user_id);
    // console.log(result.user_id);
    // console.log(`/allBoards/${result.user_id}`);
    if(result != "Failed")
    {
      const url = "/allBoards/" + result.user_id;
      navigate(url);
    }
    // window.location.reload(true);
    // props.setFalse();
  };

  useEffect(() => {
    generateHash();
  },[])

  const generateHash = (password) => {
    const gen = crypto.SHA512(password).toString()
    return gen;
  }

  return (
    <React.Fragment>
      <div className="loginBackground">
        <div className="loginCard">
          <div className="loginBorder">
            <img className="kanbanBoardImage" src={KanbanBoardImage} />
            <div className="loginHeader"> Kanban Board </div>
            <form onSubmit={checkLogin}>
              <div className="loginInputFields">
                <input
                  type="text"
                  className="loginInput"
                  placeholder="Username"
                  name="loginEmail"
                />
                <input
                  type="password"
                  className="loginInput"
                  placeholder="Password"
                  name="password"
                />
                <a href=""> Register </a>
              </div>
              <button className="loginButton"> Login </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
