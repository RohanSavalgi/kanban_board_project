import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./kanbanBoard.css";
import StatusColumn from "../../Components/StatusColumn/StatusColumn";
import EventUpdationModal from "../../Components/EventUpdationModal/EventUpdationModal";

const KanbanBoard = () => {
  const { board_id } = useParams();

  const [modalOpenOrClose, setModalOpenOrClose] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const onClickHandler = () => {
    setModalOpenOrClose(true);
  };

  const closeModal = () => {
    setModalOpenOrClose(false);
  };

  const searchChanged = (event) => {
    let lowerCase = event.target.value.toLowerCase();
    setSearchedText(lowerCase);
  };

  return (
    <>
      {modalOpenOrClose && (
        <EventUpdationModal
          eventId={"0"}
          kanbanBoardId={1}
          setFalse={closeModal}
        />
      )}
      <div className="kanbanBoardField">
        <div className="kanbanBoard">
          <header className="kanbanBoardTitle"> Kanban Board </header>
          <div className="createrName"> Buzz Aldrin's Task </div>
          <div className="searchAndCreate">
            <button className="createButton" onClick={onClickHandler}>
              Create
            </button>
            <div className="searchBar">
              <input type="text" className="searchStyle" placeholder="Search" value={searchedText} onChange={searchChanged} />
              {/* <button className="searchClear" onClick={clearSearch}>X</button> */}
            </div>
          </div>
          <div className="columns">
            <StatusColumn
              status_from_top={1}
              input={searchedText}
              title={"Not Started"}
              kanbanId={board_id}
            />
            <StatusColumn
              status_from_top={2}
              input={searchedText}
              title={"In Progress"}
              kanbanId={board_id}
            />
            <StatusColumn
              status_from_top={3}
              input={searchedText}
              title={"Completed"}
              kanbanId={board_id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
