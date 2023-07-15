import React from "react";
import greenArrow from "../../assets/greenArrowDown.png";
import blueArrow from "../../assets/blueArrowDown.png";
import redArrow from "../../assets/redArrowDown.png";

import "./EventCard.css";

const EventCard = (props) => {
  const priorityCheck = () => {
    if (props.priority == "1") return "Low";
    else if (props.priority == "2") return "Medium";
    else return "High";
  };

  const imagePicker = () => {
    if (props.priority == "1") return greenArrow;
    else if (props.priority == "2") return blueArrow;
    else return redArrow;
  };

  return (
    <React.Fragment>
      <a href="google.com">
        <div className="eventCard">
          <div className="cardHeader">{props.title}</div>
          <div className="cardContent"> {props.content} </div>
          <div className="tray">
            <div className="priorityTray">
              <img className="arrow" src={imagePicker()} />
              <div className="priority"> {priorityCheck()} </div>
            </div>
            <div className="storyPoints"> {props.storyPoints} </div>
          </div>
        </div>
      </a>
    </React.Fragment>
  );
};

export default EventCard;
