import React from "react";
import { useState, useEffect } from "react";

import "./StatusColumn.css";
import EventCard from "../EventCard/EventCard";
import EventUpdationModal from "../EventUpdationModal/EventUpdationModal";

const StatusColumn = (props) => {
  const url = `http://127.0.0.1:8000/kanbanBoards/event/${props.kanbanId}/`;

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
    setEvents(jsonData);
    if (jsonData.length > 0) {
      setNoEvents(false);
    }
  };

  const cardClick = (event) => {
    setPassDataToModalId(event.target.id);
    setModalOpenOrClose(true);
  };

  const modalClose = () => {
    setModalOpenOrClose(false);
  };

  return (
    <React.Fragment>
      {modalOpenOrClose ? (
        <EventUpdationModal setFalse={modalClose} eventId={passDataToModalId} />
      ) : null}
      <div className="statusColumn">
        <div className="columnTitle">
          {props.title} (
          {events.length &&
            events.filter((item) => {
              if (item.status == props.status_from_top) return item;
            }).length}
          )
        </div>
        <div className="columnField">
          <div className="sortingFields">
            <select className="sortingOption leftRounded">
              <option>
                Story Points
              </option>
            </select>
            <select className="sortingOption rightRounded">
              <option>Based on</option>
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
          <div className="noEvents">{checkNoEvents()}</div>
          {events.length &&
            events
              .filter((post) => {
                if (post.status == props.status_from_top) {
                  return post;
                }
              })
              .filter((post) => {
                if (props.input === "") {
                  return post;
                } else if (
                  post.event_name
                    .toLowerCase()
                    .includes(props.input.toLowerCase())
                ) {
                  return post;
                }
              })
              .sort((postA, postB) => {
                return postA.priority - postB.priority;
              })
              .map((item) => (
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
