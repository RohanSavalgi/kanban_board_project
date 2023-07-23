import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import urlPath from "../../URL/url";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ProgressBar from "@ramonak/react-progress-bar";

import "./kanbanBoard.css";
import StatusColumn from "../../Components/StatusColumn/StatusColumn";
import EventUpdationModal from "../../Components/EventUpdationModal/EventUpdationModal";
import DarkLighButton from "../../Components/DarkLightButton/DarkLightButton";

const KanbanBoard = () => {
  const navigate = useNavigate();
  const { board_id } = useParams();

  const [eventData, setEventData] = useState([]);
  const [modalOpenOrClose, setModalOpenOrClose] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const getUrl = `http://${urlPath}:8000/kanbanBoards/event/${board_id}/`;

  const fetchData = async () => {
    const data = await fetch(getUrl);
    const jsonData = await data.json();
    // console.log(jsonData);
    setEventData(jsonData);

    // if (jsonData.length > 0) {
    //   setNoEvents(false);
    // }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token") == 0) {
      navigate("/");
    }
    fetchData();
  }, []);

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

  ChartJS.register(ArcElement, Tooltip, Legend);

  let dataValues = [0, 0, 0];
  if (eventData.length > 0) {
    dataValues = [
      eventData.filter((item) => {
        if (item.status == 1) return item;
      }).length,
      eventData.filter((item) => {
        if (item.status == 2) return item;
      }).length,
      eventData.filter((item) => {
        if (item.status == 3) return item;
      }).length,
    ];
  }

  let priorityValues = [0, 0, 0];
  if (eventData.length > 0) {
    priorityValues = [
      eventData.filter((item) => {
        if (item.priority == 1) return item;
      }).length,
      eventData.filter((item) => {
        if (item.priority == 2) return item;
      }).length,
      eventData.filter((item) => {
        if (item.priority == 3 || item.priority == 4) return item;
      }).length,
    ];
  }

  const data = {
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        label: "Number of Events",
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(144, 238, 144, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(144, 238, 144, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataPriority = {
    labels: ["Priority 1", "Priority 2", "Priority 3 & P4"],
    datasets: [
      {
        label: "Number of Events",
        data: priorityValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(144, 238, 144, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(144, 238, 144, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <DarkLighButton />
      {modalOpenOrClose && (
        <EventUpdationModal
          eventId={"0"}
          kanbanBoardId={board_id}
          setFalse={closeModal}
        />
      )}
      <div className="kanbanBoardField">
        <div className="kanbanBoard">
          <div className="dashboard">
            <div className="dashboardHead"> Dashboard </div>
            <div>Status</div>
            <div className="charts">
              <Doughnut className="pieChart" data={data} />
              <Doughnut className="pieChart" data={dataPriority} />
            </div>
            {eventData.length > 0 && (
              <>
                <div>Progress</div>
                <div className="progressBar">
                  <ProgressBar
                    className="progressBar"
                    barContainerClassName="container"
                    bgColor="rgba(42, 78, 203, 0.7)"
                    labelClassName="label"
                    completed={
                      eventData.length > 0 &&
                      (
                        (eventData.filter((item) => {
                          if (item.status == 3) return item;
                        }).length /
                          eventData.length) *
                        100
                      ).toFixed(2) || 0
                    }
                  />
                </div>
              </>
            )}
          </div>
          <header className="kanbanBoardTitle"> Kanban Board </header>
          <div className="createrName"> Buzz Aldrin's Task </div>
          <div className="searchAndCreate">
            <button className="createButton" onClick={onClickHandler}>
              Create
            </button>
            <div className="searchBar">
              <input
                type="text"
                className="searchStyle"
                placeholder="Search"
                value={searchedText}
                onChange={searchChanged}
              />
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
