import React from "react";
import greenArrow from "../../assets/greenArrowDown.png";
import blueArrow from "../../assets/blueArrowDown.png";
import redArrow from "../../assets/redArrowDown.png";

import "./EventCard.css";

const EventCard = (props) => {

  const eventData = {};

  const priorityCheck = () => {
    if (props.priority == "3" || props.priority == "4") return "Low";
    else if (props.priority == "2") return "Medium";
    else return "High";
  };

  const imagePicker = () => {
    if (props.priority == "3" || props.priority == "4") return greenArrow;
    else if (props.priority == "2") return blueArrow;
    else return redArrow;
  };

  return (
    <div id={props.cardId}>
      <div className="eventCard" onClick={props.onClick} id={props.cardId}>
        <div className="cardHeader"  id={props.cardId}>{props.title}</div>
        <div className="cardContent"  id={props.cardId}> {props.content} </div>
        <div className="tray"  id={props.cardId}>
          <div className="priorityTray"  id={props.cardId}>
            <img className="arrow" src={imagePicker()}  id={props.cardId} />
            <div className="priority" id={props.cardId} > {priorityCheck()}  </div>
          </div>
          <div className="storyPoints" id={props.cardId} > {props.storyPoints} </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
