import React from "react";
import closeButton from "../../assets/closeButton.png";
import urlPath from "../../URL/url";
import http from '../../URL/httpsOrhttps';

import "./BoardCreationModal.css";

const BoardCreationModal = (props) => {
  // creates a new board
  const createBoard = async (event) => {
    event.preventDefault();
    const createBoardUrl = `${http}://${urlPath}:8000/kanbanBoards/board/${props.user_id_passed}/`;
    const reponse = await fetch(createBoardUrl, {
      method: "POST",
      body: JSON.stringify({
        kanban_board_discription: event.target.boardName.value,
        user: props.user_id_passed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await reponse.json();
    window.location.reload(true);
    props.onCloseHandler();
  };
  return (
    <>
      <div className="boardBackground">
        <div className="boardModal">
          <div className="boardPlacement">
            <div className="closeButton">
              <button className="buttonStyle" onClick={props.onCloseHandler}>
                <img className="crossButton" src={closeButton} />
              </button>
            </div>
            <form onSubmit={createBoard}>
              <div className="boardContent">
                <div className="boardTitle"> Create Board </div>
                <div className="boardFieldName"> Board Name </div>
                <input
                  required
                  name="boardName"
                  id="boardName"
                  className="boardInputField"
                />
              </div>
              <div className="createButtonTray">
                <button>Cancel</button>
                <button className="boardSaveButton" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardCreationModal;
