import React, { useState } from "react";

import "./kanbanBoard.css";
import StatusColumn from "../../Components/StatusColumn/StatusColumn";
import EventUpdationModal from "../../Components/EventUpdationModal/EventUpdationModal";

const KanbanBoard = () => {
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
  }

  const clearSearch = () => {
    setSearchedText("");
  }

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
              {/* <input type="text" className="searchStyle" placeholder="Search" value={searchedText} onChange={searchChanged} /> */}
              {/* <button className="searchClear" onClick={clearSearch}>X</button> */}
            </div> 
          </div>
          <div className="columns">
            <StatusColumn input={searchedText} title={"Not Started"} status={"1"} />
            <StatusColumn input={searchedText} title={"In Progress"} status={"2"} />
            <StatusColumn input={searchedText} title={"Completed"} status={"3"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
