import React, { useState, useEffect, useDebugValue } from "react";
import urlPath from "../../URL/url";

import "./Comments.css";

const Comments = (props) => {
  // console.log("hello ok " + props.eventIdPassed);
  const [comments, setComments] = useState([]);
  const [eventId, setEventId] = useState(0);
  
  
  useEffect(() => {
    setEventId(props.eventIdPassed)
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setEventId(props.eventIdPassed);
    const respose = await fetch(getCommentsUrl);
    console.log(getCommentsUrl);
    const commentsJson = await respose.json();
    setComments(commentsJson);
  };

  return (
    <>
      <div className="comments">
        <div className="commentsHeader">Comments</div>
        <div className="allCommentsList">
          {comments.map((item) => (
            <div key={item.comment_id} className="message">
              <div className="firstRow">
                <div className="userId"> {item.user} </div>
                <div className="commentMessage"> {item.comment_body} </div>
              </div>
              <div className="time"> {item.comment_timestamp} </div>
            </div>
          ))}
        </div>
        <input type="text" placeholder="Comment" className="commentsInput" />
      </div>
    </>
  );
};

export default Comments;
