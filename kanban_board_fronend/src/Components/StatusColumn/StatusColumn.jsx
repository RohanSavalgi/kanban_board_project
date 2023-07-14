import React from "react";
import { useState, useEffect } from "react";

import "./StatusColumn.css";
import EventCard from "../EventCard/EventCard";

const StatusColumn = (props) => {
  const url = `http://127.0.0.1:8000/kanbanBoards/getEventsByStatus/${props.status}/`;
  // main useEffect
  useEffect(() => {fetchData()},[])

  // state for the data
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(true)

  const checkNoEvents = () => {
    if (noEvents == true){
      return "No Events"
    }
    else return null;
  }

  const fetchData = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    if(jsonData.length > 0)
    {
      setEvents(jsonData);
      setNoEvents(false)
    }
  };

  return (
    <React.Fragment>
      <div className="statusColumn">
        <div className="columnTitle">
          {props.title} ({events.length}){" "}
        </div>
        <div className="columnField">
          { checkNoEvents() }
          {events.map((item) => (
            <EventCard
              title={item.event_name}
              content={item.event_discription}
              priority={item.priority}
              storyPoints={"3"}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatusColumn;
