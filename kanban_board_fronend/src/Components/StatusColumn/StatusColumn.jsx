import React from "react";
import { useState, useEffect } from "react";

import "./StatusColumn.css";
import EventCard from "../EventCard/EventCard";
import EventUpdationModal from "../EventUpdationModal/EventUpdationModal";

const StatusColumn = (props) => {
  const url = `http://127.0.0.1:8000/kanbanBoards/getEventsByStatus/${props.status}/`;
  
  // state for the data
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(true);
  const [modalOpenOrClose, setModalOpenOrClose] = useState(false);
  const [passDataToModalId, setPassDataToModalId] = useState(0);
  
  // main useEffect
  useEffect(() => {
    fetchData();
  }, []);

  const checkNoEvents = () => {
    if (noEvents == true) {
      return "No Events";
    } else return null;
  };

  const fetchData = async () => {
    const data = await fetch(url);
    const jsonData = await data.json();
    if (jsonData.length > 0) {
      setEvents(jsonData);
      setNoEvents(false);
    }
  };

  const cardClick = (event) => {
    setPassDataToModalId(event.target.id)
    setModalOpenOrClose(true);
  };

  const modalClose = () => {
    setModalOpenOrClose(false);
  };

  return (
    <React.Fragment>
      {modalOpenOrClose ? <EventUpdationModal setFalse={modalClose} eventId={passDataToModalId} /> : null}
      <div className="statusColumn">
        <div className="columnTitle">
          {props.title} ({events.length})
        </div>
        <div className="columnField">
          {checkNoEvents()}
          {events.map((item) => (
            <EventCard
              key={item.event_id}
              id={item.event_id}
              cardId={item.event_id}
              onClick={cardClick}
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
