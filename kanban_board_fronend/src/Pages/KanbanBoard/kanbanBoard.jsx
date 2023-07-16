import React, { useState } from "react";

import "./kanbanBoard.css";
import StatusColumn from "../../Components/StatusColumn/StatusColumn";

const KanbanBoard = () => {
  return (
    <>
      <div className="kanbanBoardField">
        <div className="kanbanBoard">
          <header className="kanbanBoardTitle"> Kanban Board </header>
          <div className="createrName"> Buzz Aldrin's Task </div>
          <button className="createButton"> Create </button>
          <div className="columns">
            <StatusColumn title={"Not Started"} status={"1"} />
            <StatusColumn title={"In Progress"} status={"2"}/>
            <StatusColumn title={"Completed"} status={"3"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
