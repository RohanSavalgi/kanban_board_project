import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SnackBarNotification from "../../Components/SnackBarNotification/SnackBarNotification";
import scenaryImage1 from "../../assets/natureImg1.png";
import scenaryImage2 from "../../assets/natureImg2.png";
import scenaryImage3 from "../../assets/natureImg3.png";
import scenaryImage4 from "../../assets/natureImg4.png";
import scenaryImage5 from "../../assets/natureImg5.png";
import scenaryImage6 from "../../assets/natureImg6.png";
import scenaryImage7 from "../../assets/natureImg7.png";
import scenaryImage8 from "../../assets/natureImg8.png";
import { useNavigate } from "react-router-dom";

import urlPath from '../../URL/url'

import "./AllBoards.css";
import BoardCreationModal from "../../Components/BoardCreationModal/BoardCreationModal";
import DarkLighButton from "../../Components/DarkLightButton/DarkLightButton";

const AllBoards = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();

  const [allBoards, setAllBoards] = useState([]);
  const [userData, setUserData] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    setLoggedIn(true);
    getData();
  }, []);

  const getBoardsUrl = `http://${urlPath}:8000/kanbanBoards/board/user/${user_id}/`;
  const getUserUrl = `http://${urlPath}:8000/kanbanBoards/user/${user_id}/`;

  const getData = async () => {
    const userResponse = await fetch(getUserUrl);
    const userJsonResponse = await userResponse.json();
    setUserData(userJsonResponse[0].user_name);

    const response = await fetch(getBoardsUrl);
    const jsonResponse = await response.json();
    setAllBoards(jsonResponse);
    console.log(jsonResponse);
  };

  const imagePicker = () => {
    var randomImage = [
      scenaryImage1,
      scenaryImage2,
      scenaryImage3,
      scenaryImage4,
      scenaryImage5,
      scenaryImage6,
      scenaryImage7,
      scenaryImage8,
    ];
    var number = Math.floor(Math.random() * randomImage.length);
    return randomImage[number];
  };

  const onClickHandler = (event) => {
    console.log(event.target.id);
    navigate(`/board/${event.target.id}/`);
    setCreateModal(true);
  };

  const openModalHandler = () => {
    setCreateModal(true);
  }

  const closeModalHandler = () => {
    setCreateModal(false);
  }

  return (
    <React.Fragment>
      <DarkLighButton />
      {loggedIn  && <SnackBarNotification color="green" message="Logged-in successfully" />}
      <div className="allBoardBackground">
      { createModal && <BoardCreationModal user_id_passed={user_id} onCloseHandler={closeModalHandler} />}
        <div className="allBoardField">
          <div className="usernameTile">Welcome, {userData}</div>
          <button className="boardCreate" onClick={openModalHandler}>
              Create
            </button>
          <div className="allBoardsView">
            {allBoards.map((item) => (
              <div
                key={item.kanban_board_id}
                id={item.kanban_board_id}
                className="board"
                onClick={onClickHandler}
              >
                <div
                  id={item.kanban_board_id}
                  className="kanbanImage"
                  style={{
                    backgroundImage: `url(${imagePicker()})`,
                    height: "60%",
                  }}
                ></div>
                <div id={item.kanban_board_id} className="boardInfo">
                  {item.kanban_board_discription}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllBoards;
