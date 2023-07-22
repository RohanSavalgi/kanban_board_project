import React from "react";
import { useState, useEffect } from "react";
import urlPath from '../../URL/url';

import "./StatusColumn.css";
import EventCard from "../EventCard/EventCard";
import EventUpdationModal from "../EventUpdationModal/EventUpdationModal";
import SnackBarNotification from "../SnackBarNotification/SnackBarNotification";

const StatusColumn = (props) => {
  const url = `http://${urlPath}:8000/kanbanBoards/event/${props.kanbanId}/`;

  // state for the data
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(true);
  const [modalOpenOrClose, setModalOpenOrClose] = useState(false);
  const [passDataToModalId, setPassDataToModalId] = useState(0);
  const [updateData, setUpdateData] = useState(1);
  const [updated, setUpdated] = useState(false);
  const [created, setCreated] = useState(false);
  const [createModalOpenOrClose, setCreateModalOpenOrClose] = useState(false);
  const [filterNumber, setFilterNumber] = useState(1);
  const [order, setOrder] = useState("b");

  const filterChanger = (event) => {
    setFilterNumber(event.target.value);
  };

  const orderChangeHandler = (event) => {
    setOrder(event.target.value);
  };

  const setUpdatedHandler = () => {
    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
    }, 6000);
  };

  const setCreatedHandler = () => {
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 6000);
  };

  // main useEffect
  useEffect(() => {
    fetchData();
  }, [updated]);

  const updateDataHandler = () => {
    setUpdateData(updateData + 1);
  };

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
    setPassDataToModalId(0);
    setModalOpenOrClose(false);
  };

  return (
    <React.Fragment>
      {updated && (
        <SnackBarNotification message="Updated Event!" color="blue" />
      )}
      {created && (
        <SnackBarNotification message="Event Created!" color="green" />
      )}
      {modalOpenOrClose ? (
        <EventUpdationModal
          updateDataColumns={updateDataHandler}
          setFalse={modalClose}
          eventId={passDataToModalId}
          setUpdateProps={setUpdatedHandler}
        />
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
            <select
              className="sortingOption leftRounded"
              onChange={filterChanger}
            >
              <option key={"1"} value={"1"} name="select">
                Select
              </option>
              <option key={"2"} value={"2"} name="status">
                Story Points
              </option>
              <option key={"3"} value={"3"} name="startDate">
                Start Date
              </option>
              <option key={"4"} value={"4"} name="endDate">
                End Date
              </option>
              <option key={"5"} value={"5"} name="priority">
                Priority
              </option>
            </select>
            <select
              className="sortingOption rightRounded"
              onChange={orderChangeHandler}
            >
              <option key={"b"} value={"b"} name={"b"}>
                Based on
              </option>
              <option key={"a"} value={"a"} name={"a"}>
                Ascending
              </option>
              <option key={"d"} value={"d"} name={"d"}>
                Descending
              </option>
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
              .sort((postA, postB) => {
                if (filterNumber == 2) {
                  if (order == "a") {
                    return postA.story_point - postB.story_point;
                  } else if (order == "d")
                    return postB.story_point - postA.story_point;
                }
                if (filterNumber == 3) {
                  const array1 = postA.event_start_date.split("-");
                  const array2 = postB.event_start_date.split("-");
                  let stringDate1 = "";
                  let stringDate2 = "";
                  stringDate1 = array1.join("");
                  stringDate2 = array2.join("");
                  const postADateNum = Number(stringDate1);
                  const postBDateNum = Number(stringDate2);
                  if (order == "a") {
                    return postADateNum - postBDateNum;
                  } else if (order == "d") return postBDateNum - postADateNum;
                }
                if (filterNumber == 4) {
                  const array1 = postA.event_end_date.split("-");
                  const array2 = postB.event_end_date.split("-");
                  let stringDate1 = "";
                  let stringDate2 = "";
                  stringDate1 = array1.join("");
                  stringDate2 = array2.join("");
                  const postADateNum = Number(stringDate1);
                  const postBDateNum = Number(stringDate2);
                  if (order == "a") {
                    return postADateNum - postBDateNum;
                  } else if (order == "d") return postBDateNum - postADateNum;
                }
                if (filterNumber == 5) {
                  if (order == "a") {
                    return postB.priority - postA.priority;
                  } else if (order == "d")
                    return postA.priority - postB.priority;
                }
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
                  storyPoints={item.story_point || 0}
                />
              ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatusColumn;
