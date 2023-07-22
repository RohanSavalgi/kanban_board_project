import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import urlPath from '../../URL/url'

import "./kanbanBoard.css";
import StatusColumn from "../../Components/StatusColumn/StatusColumn";
import EventUpdationModal from "../../Components/EventUpdationModal/EventUpdationModal";
import DarkLighButton from "../../Components/DarkLightButton/DarkLightButton";
import PieChart from "../../Components/PieChart/PieChart";

const KanbanBoard = () => {

  const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 1,
    },
    {
      id: 2,
      year: 2017,
      userGain: 2,
    },
    {
      id: 3,
      year: 2018,
      userGain: 3,
    },
    {
      id: 4,
      year: 2019,
      userGain: 2,
    },
    {
      id: 5,
      year: 2020,
      userGain: 2,
    }
  ];

  const { board_id } = useParams();
  const [eventData, setEventData] = useState([]);

  const getUrl = `http://${urlPath}:8000/kanbanBoards/event/${board_id}/`;

  const fetchData = async () => {
    const data = await fetch(getUrl);
    const jsonData = await data.json();
    // console.log(jsonData);
    setEventData(jsonData);

    if (jsonData.length > 0) {
      setNoEvents(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  
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

  Chart.register(CategoryScale);

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  return (
    <>
      <DarkLighButton />
      {modalOpenOrClose && (
        <EventUpdationModal
          eventId={"0"}
          kanbanBoardId={1}
          setFalse={closeModal}
        />
      )}
      <div className="kanbanBoardField">
        <div className="kanbanBoard">
          <div className="dashboard">
            <div className="dashboardHead"> Dashboard </div>
            <div>Statuses</div>
            <PieChart chartData={chartData} />
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
