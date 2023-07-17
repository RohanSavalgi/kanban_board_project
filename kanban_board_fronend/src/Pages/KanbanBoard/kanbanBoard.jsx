import React, { useState } from "react";

import "./kanbanBoard.css";
import StatusColumn from "../../Components/StatusColumn/StatusColumn";
import EventUpdationModal from "../../Components/EventUpdationModal/EventUpdationModal";

const KanbanBoard = () => {

  const [modalOpenOrClose, setModalOpenOrClose] = useState(false); 

  const onClickHandler = () => {
    setModalOpenOrClose(true);
  }

  const closeModal = () => {
    setModalOpenOrClose(false)
  }

  return (
    <>
      { modalOpenOrClose && <EventUpdationModal eventId={"0"} kanbanBoardId={1} setFalse={closeModal} />}
      <div className="kanbanBoardField">
          <div className="kanbanBoard">
            <header className="kanbanBoardTitle"> Kanban Board </header>
            <div className="createrName"> Buzz Aldrin's Task </div>
            <button className="createButton" onClick={onClickHandler} > Create </button>
            <div className="columns">
              <StatusColumn title={"Not Started"} status={"1"} />
              <StatusColumn title={"In Progress"} status={"2"} />
              <StatusColumn title={"Completed"} status={"3"} />
            </div>
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
