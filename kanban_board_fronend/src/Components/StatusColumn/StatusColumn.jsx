import React from "react";

import "./StatusColumn.css";

const StatusColumn = (props) => {
  return (
    <React.Fragment>
      <div className="statusColumn">
        <div className="columnTitle">{props.title} ({props.leftEvents}) </div>
        <div className="columnField">  </div>
      </div>
    </React.Fragment>
  );
};

export default StatusColumn;
