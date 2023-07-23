import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import urlPath from "../../URL/url";

import "./EventUpdationModal.css";
import closeButton from "../../assets/closeButton.png";
import SnackBarNotification from "../SnackBarNotification/SnackBarNotification";

const EventUpdationModal = (props) => {
  const date = new Date();

  const url = `http://${urlPath}:8000/kanbanBoards/events/${props.eventId}/`;
  const statusUrl = `http://${urlPath}:8000/kanbanBoards/status/`;
  const priorityUrl = `http://${urlPath}:8000/kanbanBoards/priority/`;
  const creatUrl = `http://${urlPath}:8000/kanbanBoards/event/`;
  const deleteUrl = `http://${urlPath}:8000/kanbanBoards/events/${props.eventId}/`;
  const createCommentUrl = `http://${urlPath}:8000/kanbanBoards/comment/`;

  const [eventData, setEventData] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectionForStatus, setSelectionForStatus] = useState(0);
  const [selectionForPriority, setSelectionForPriority] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentsChanged, setCommentsChanged] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [commentsChanged]);

  function noDateInput(event) {
    var keyCode = event.keyCode;
    var allowedCharacters = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "/",
      ".",
    ];

    if (allowedCharacters.indexOf(keyCode) === -1) {
      event.preventDefault();
    }
  }

  const [formData, setFormData] = useState(false);

  const checkForm = (data) => {
    for (var key in data) {
      if (data[key] == "") {
        setFormData(true);
        return false;
      }
    }
  };

  const statusChangeHandler = (event) => {
    setSelectionForStatus(event.target.value);
  };

  const priorityChangeHandler = (event) => {
    setSelectionForPriority(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    if (props.eventId != 0) {
      event.preventDefault();
      const data = await fetch(url);
      const jsonData = await data.json();

      const postEventUrl = `http://${urlPath}:8000/kanbanBoards/events/${jsonData[0].event_id}/`;
      const formData = {
        event_name: jsonData[0].event_name,
        event_type: jsonData[0].event_type,
        event_discription: event.target.description.value,
        event_summary: event.target.summary.value,
        event_start_date: event.target.startDate.value,
        event_end_date: event.target.endDate.value,
        reporter_user: 1,
        priority: event.target.priority.value,
        status: event.target.status.value,
        story_points: Number(event.target.storyPoints.value),
      };
      console.log(formData);
      if (checkForm(formData) == false) {
        return null;
      }

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
          story_point: Number(event.target.storyPoints.value),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await reponse.json();
      window.location.reload(true);
      props.setUpdateProps();
      props.setFalse();
      props.updateDataColumns();
    } else {
      event.preventDefault();
      const data = {
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
        story_point: Number(event.target.storyPoints.value),
      };

      if (checkForm(data) == false) {
        return null;
      }
      console.log(data);

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
          story_point: Number(event.target.storyPoints.value),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await reponse.json();
      window.location.reload(true);
      props.setFalse();
      // props.setUpdateProps();
      // props.updateDataColumns();
    }
  };

  const fetchComments = async () => {
    if (props.eventId != 0) {
      const getCommentsUrl = `http://${urlPath}:8000/kanbanBoards/comment/${props.eventId}/`;
      const respose = await fetch(getCommentsUrl);
      console.log(getCommentsUrl);
      const commentsJson = await respose.json();
      setComments(commentsJson);
    }
  };

  const fetchData = async () => {
    if (props.eventId != 0) {
      const getCommentsUrl = `http://${urlPath}:8000/kanbanBoards/comment/${props.eventId}/`;
      const respose = await fetch(getCommentsUrl);
      console.log(getCommentsUrl);
      const commentsJson = await respose.json();
      setComments(commentsJson);
    }

    const statusDataUrl = await fetch(statusUrl);
    const statusJsonData = await statusDataUrl.json();
    setStatusData(statusJsonData);

    if (props.eventId != 0) {
      const data = await fetch(url);
      const jsonData = await data.json();
      setEventData(jsonData[0]);
      console.log(jsonData)
      setSelectionForStatus(jsonData[0].status);
      setSelectionForPriority(jsonData[0].priority);

      const userUrl = `http://${urlPath}:8000/kanbanBoards/user/${jsonData[0].reporter_user}/`;
      const user = await fetch(userUrl);
      const jsonUserData = await user.json();
      setUserData(jsonUserData[0]);
    }
    const priorityDataUrl = await fetch(priorityUrl);
    const priorityJsonData = await priorityDataUrl.json();
    setPriorityData(priorityJsonData);
  };

  const deleteData = async (event) => {
    event.preventDefault();
    const response = fetch(deleteUrl, {
      method: "DELETE",
    });
    const result = (await response).json();
    window.location.reload(true);
    props.setFalse();
  };

  const createComment = async (event) => {
    event.preventDefault();
    const reponse = await fetch(createCommentUrl, {
      method: "POST",
      body: JSON.stringify({
        comment_body: event.target.commentInput.value,
        comment_timestamp: "2023-05-05 12:12:12",
        event: props.eventId,
        user: userData.user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    event.target.commentInput.value = "";
    setCommentsChanged(commentsChanged + 1);
  };

  let content = (
    <React.Fragment>
      <div className="modalBackground">
        <div className="modal">
          <div className="modalPlacableContent">
            <div className="firstRowCross">
              <button className="crossButton" onClick={props.setFalse}>
                <img className="crossButtonStyle" src={closeButton} />
              </button>
            </div>
            {props.eventId != 0 && (
              <div className="modalTitle"> {eventData.event_name} </div>
            )}
            {props.eventId == 0 && (
              <div className="modalTitle"> Create new event </div>
            )}
            <div className="modalContent">
              <form onSubmit={onSubmitHandler}>
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
                        value={eventData.story_point}
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
                      min={date.getDate()}
                      name="startDate"
                      defaultValue={eventData.event_start_date}
                      // onKeyDown={noDateInput}
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
                    <div className="modalDescriptionText">
                      Acceptance Criteria
                    </div>
                    <textarea
                      name="summary"
                      className="modalDescriptionField"
                      defaultValue={eventData.event_summary}
                    />
                  </div>
                  <div className="modalOther">
                    <div className="modalStoryPoints"></div>
                    {props.eventId != 0 && selectionForStatus == 3 && (
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
          <div className="errorMessage">
            {formData && "Some fields are left empty!"}
          </div>
        </div>
        {props.eventId != 0 && (
          <div className="comments">
            <div className="commentsHeader">Comments</div>
            <div className="allCommentsList">
              {comments.length > 0 &&
                comments.map((item) => (
                  <div key={item.comment_id} className="message">
                    <div className="firstRow">
                      <div className="userId"> {item.user} </div>
                      <div className="commentMessage">{item.comment_body}</div>
                    </div>
                    <div className="time"> {item.comment_timestamp} </div>
                  </div>
                ))}
            </div>
            <form className="insertComment" onSubmit={createComment}>
              <input
                type="text"
                name="commentInput"
                placeholder="Comment"
                className="commentsInput"
              />
              <button className="commentButton" type="submit">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal_hook"));
};

export default EventUpdationModal;
