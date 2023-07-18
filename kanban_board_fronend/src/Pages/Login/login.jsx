import React from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
import KanbanBoardImage from "../../assets/kanban.png";

const Login = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    navigate("/allBoards/1");
  };

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
                />
                <input
                  type="password"
                  className="loginInput"
                  placeholder="Password"
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
