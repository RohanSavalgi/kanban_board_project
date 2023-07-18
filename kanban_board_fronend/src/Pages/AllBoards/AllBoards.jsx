import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./AllBoards.css";

const AllBoards = () => {
  const { user_id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const [allBoards, setAllBoards] = useState([]);
  const [userData, setUserData] = useState("");

  const getBoardsUrl = `http://127.0.0.1:8000/kanbanBoards/board/${user_id}/`;
  const getUserUrl = `http://127.0.0.1:8000/kanbanBoards/user/${user_id}/`;

  const getData = async () => {
    const userResponse = await fetch(getUserUrl);
    const userJsonResponse = await userResponse.json();
    setUserData(userJsonResponse[0].user_name);
    
    const response = await fetch(getBoardsUrl);
    const jsonResponse = await response.json();
    setAllBoards(jsonResponse);
    console.log(jsonResponse);
  };

  return (
    <React.Fragment>
      <div className="allBoardBackground">
        <div className="allBoardField">
          <div className="usernameTile">Welcome, {userData}</div>
          <div className="allBoardsView">
            {allBoards.map((item) => {
                <div className="board">
                    {item.kanban_board_name}
                </div>    
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllBoards;
