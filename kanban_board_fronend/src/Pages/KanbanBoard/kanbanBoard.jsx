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
    setSearchedText(event.target.value);
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
            {/* <div className="searchBar">
              <input type="text" className="searchStyle" placeholder="Search" onChange={searchChanged} />
            </div>  */}
          </div>
          <div className="columns">
            <StatusColumn searched={searchedText} title={"Not Started"} status={"1"} />
            <StatusColumn searched={searchedText} title={"In Progress"} status={"2"} />
            <StatusColumn searched={searchedText} title={"Completed"} status={"3"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
