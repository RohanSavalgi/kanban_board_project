import React from "react";
import { useState, useEffect } from "react";

import "./StatusColumn.css";
import EventCard from "../EventCard/EventCard";

const StatusColumn = (props) => {
  const url = "http://127.0.0.1:8000/kanbanBoards/getEventsByPriority/3/";
  // main useEffect
  useEffect(() => {fetchData()},[])

  // state for the data
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    setEvents(jsonData);
  };

  return (
    <React.Fragment>
      <div className="statusColumn">
        <div className="columnTitle">
          {props.title} ({props.leftEvents}){" "}
        </div>
        <div className="columnField">
          {events.map((item) => (
            <EventCard
              title={item.event_name}
              content={item.event_discription}
              priority={item.priority_id}
              storyPoints={"3"}
            />
          ))}

          {/* <EventCard
            title={"Clean office space"}
            content={
              "I want to clean my office table, mop the floor, and vacuum the chair."
            }
            priority={"3"}
          /> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatusColumn;
