import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./EventUpdationModal.css";
import closeButton from "../../assets/closeButton.png";

const EventUpdationModal = (props) => {
  const url = `http://127.0.0.1:8000/kanbanBoards/getEventById/${props.eventId}/`;
  const statusUrl = `http://127.0.0.1:8000/kanbanBoards/getAllStatus/`;
  const priorityUrl = `http://127.0.0.1:8000/kanbanBoards/getAllPriority/`;
  const creatUrl = "http://127.0.0.1:8000/kanbanBoards/createEvent/";
  const deleteUrl = `http://127.0.0.1:8000/kanbanBoards/deleteEvent/${props.eventId}/`;

  const [eventData, setEventData] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectionForStatus, setSelectionForStatus] = useState(0);
  const [selectionForPriority, setSelectionForPriority] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const statusChangeHandler = (event) => {
    setSelectionForStatus(event.target.value);
  };

  const priorityChangeHandler = (event) => {
    setSelectionForPriority(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = await fetch(url);
    const jsonData = await data.json();
    const postEventUrl = `http://127.0.0.1:8000/kanbanBoards/updateEvent/${jsonData[0].event_id}/`;
    const reponse = await fetch(postEventUrl, {
      method: "PUT",
      body: JSON.stringify({
        event_name: jsonData[0].event_name,
        event_type: jsonData[0].event_type,
        event_discription: event.target.description.value,
        event_summary: event.target.summary.value,
        event_start_date: event.target.startDate.value,
        event_end_date: event.target.endDate.value,
        kanban_board: props.kanbanBoardId,
        reporter_user: 1,
        priority: event.target.priority.value,
        status: event.target.status.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await reponse.json();
    console.log(result);
    window.location.reload(true);
    props.setFalse();
  };

  const onCreateHandler = async (event) => {
    event.preventDefault();
    const reponse = await fetch(creatUrl, {
      method: "POST",
      body: JSON.stringify({
        event_name: event.target.eventName.value,
        event_type: "User Story",
        event_discription: event.target.description.value,
        event_summary: event.target.summary.value,
        event_start_date: event.target.startDate.value,
        event_end_date: event.target.endDate.value,
        kanban_board: props.kanbanBoardId,
        reporter_user: 1,
        priority: event.target.priority.value,
        status: event.target.status.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await reponse.json();
    console.log(result);
    window.location.reload(true);
    props.setFalse();
  };

  const fetchData = async () => {
    const statusDataUrl = await fetch(statusUrl);
    const statusJsonData = await statusDataUrl.json();
    setStatusData(statusJsonData);

    if (props.eventId != 0) {
      const data = await fetch(url);
      const jsonData = await data.json();
      console.log(jsonData);
      setEventData(jsonData[0]);
      setSelectionForStatus(jsonData[0].status);
      setSelectionForPriority(jsonData[0].priority);

      const userUrl = `http://127.0.0.1:8000/kanbanBoards/getUserById/${jsonData[0].reporter_user}/`;
      const user = await fetch(userUrl);
      const jsonUserData = await user.json();
      setUserData(jsonUserData[0]);
    }
    const priorityDataUrl = await fetch(priorityUrl);
    const priorityJsonData = await priorityDataUrl.json();
    setPriorityData(priorityJsonData);
  };

  const deleteData = async () => {
    const response = fetch(deleteUrl, {
      method: "DELETE",
    });
    const result = (await response).json();
    console.log(result);
    window.location.reload(true);
    props.setFalse();
  };

  let content = (
    <React.Fragment>
      <div className="modalBackground">
        <div className="modal">
          <div className="modalPlacableContent">
            <div className="firstRow">
              <button className="crossButton" onClick={props.setFalse}>
                <img className="crossButtonStyle" src={closeButton} />
              </button>
            </div>
            {props.eventId != 0 && (
              <div className="modalTitle"> {eventData.event_name} </div>
            )}
            <div className="modalContent">
              <form
                onSubmit={
                  (props.eventId != 0 && onSubmitHandler) ||
                  (props.eventId == 0 && onCreateHandler)
                }
              >
                {props.eventId == 0 && (
                  <div className="modalStoryPoints">
                    <div className="modalInputTitle">Title</div>
                    <input
                      type="text"
                      name="eventName"
                      className="modalEventNameField"
                      defaultValue={eventData.event_name}
                    />
                  </div>
                )}
                <div className="modalRows">
                  <div className="modalDescription">
                    <div className="modalDescriptionText">Description</div>
                    <textarea
                      className="modalDescriptionField"
                      defaultValue={eventData.event_discription}
                      name="description"
                    />
                  </div>
                  <div className="modalOther">
                    <div className="modalStatus">
                      <div className="modalDescriptionText">Status</div>
                      <select
                        id="status"
                        name="status"
                        className="modalDropDown"
                        onChange={statusChangeHandler}
                        value={selectionForStatus}
                      >
                        {statusData.map((item) => (
                          <option
                            key={item.status_id}
                            value={item.status_id}
                            name={item.status_id}
                          >
                            {item.status_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="modalPriority">
                      <div className="modalDescriptionText">Priority</div>
                      <select
                        id="priority"
                        name="priority"
                        className="modalDropDown"
                        onChange={priorityChangeHandler}
                        value={selectionForPriority}
                      >
                        {priorityData.map((item) => (
                          <option
                            key={item.priority_id}
                            value={item.priority_id}
                          >
                            {item.priority_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="modalStoryPoints">
                      <div className="modalDescriptionText">Story Points</div>
                      <input
                        type="text"
                        name="storyPoints"
                        className="modalStoryPointsField"
                      />
                    </div>
                  </div>
                </div>
                <div className="modalDate">
                  <div>
                    <div className="modalDescriptionText">Start Date</div>
                    <input
                      type="date"
                      className="dateInput"
                      name="startDate"
                      defaultValue={eventData.event_start_date}
                    />
                  </div>
                  <div>
                    <div className="modalDescriptionText">End Date</div>
                    <input
                      type="date"
                      name="endDate"
                      className="dateInput"
                      defaultValue={eventData.event_end_date}
                    />
                  </div>
                </div>
                <div className="modalRows">
                  <div className="modalDescription">
                    <div className="modalDescriptionText">Summary</div>
                    <textarea
                      name="summary"
                      className="modalDescriptionField"
                      defaultValue={eventData.event_summary}
                    />
                  </div>
                  <div className="modalOther">
                    <div className="modalStoryPoints">
                      <div className="modalDescriptionText">Reporter</div>
                      <div className="modalReporter"> {userData.user_name}</div>
                    </div>
                    {props.eventId != 0 && (
                      <div className="modalStoryPoints">
                        <div className="modalDescriptionText">Delete Event</div>
                        <div className="outerBorder">
                          <button
                            className="modalDeleleteButton"
                            onClick={deleteData}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modalButtonTray">
                  <button
                    className="modalCancelButton"
                    onClick={props.setFalse}
                  >
                    Cancel
                  </button>
                  <button className="modalSaveButton" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="comments"> hello </div> */}
      </div>
    </React.Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal_hook"));
};

export default EventUpdationModal;
