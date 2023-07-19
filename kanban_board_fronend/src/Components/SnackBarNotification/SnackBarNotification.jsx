import React from "react";

import "./SnackBarNotification.css";

const SnackBarNotification = (props) => {
  return (
    <>
      <div className={`notificationPlacement ${props.color}`}>
        <div className="notificationBorder">
            <div className="notificationMessage">
                {props.message}
            </div>
        </div>
      </div>
    </>
  );
};

export default SnackBarNotification;
