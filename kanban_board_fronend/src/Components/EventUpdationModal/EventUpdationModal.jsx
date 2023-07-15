import React from "react";

import "./EventUpdationModal.css";

const EventUpdationModal = (props) => {
  return (
    <React.Fragment>
      <div className="modalBackground">
        <div className="modal">
          <div className="modalPlacableContent">
            <div className="modalTitle"> {props.title} </div>
            <div className="modalContent">
              <div className="modalDescription">
                <div className="modalDescriptionText">Description</div>
                <textarea className="modalDescriptionField" value={props.discription} />
              </div>
              <div className="modalOther">
                <div className="modalStatus">
                  <div className="modalDescriptionText">Status</div>
                  <select id="cars" name="cars" className="modalDropDown">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div className="modalPriority">
                  <div className="modalDescriptionText">Priority</div>
                  <select id="cars" name="cars" className="modalDropDown">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="fiat">Fiat</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div className="modalStoryPoints">
                  <div className="modalDescriptionText">Story Points</div>
                  <input type="text" className="modalStoryPointsField" />
                </div>
              </div>
            </div>
            <div className="modalButtonTray">
              <button className="modalCancelButton" onClick={props.setFalse}> Cancel </button>
              <button className="modalSaveButton"> Save </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventUpdationModal;
