import React from "react";

import "./Comments.css";

const Comments = () => {
  const demoComments = [
    {
      message: "Yes this was update rohan.",
      user_id: 1,
      time: "2023-05-05 12:12:12",
    },
    {
        message: "hello",
        user_id: 1,
        time: "2023-05-05 12:12:12",
      },
      {
        message: "hello",
        user_id: 1,
        time: "2023-05-05 12:12:12",
      },
      {
        message: "hello",
        user_id: 1,
        time: "2023-05-05 12:12:12",
      },

  ];

  return (
    <>
      <div className="comments">
        <div className="commentsHeader">Comments</div>
        <div className="allCommentsList">
          {demoComments.map((item) => (
            <div className="message">
              <div className="firstRow">
                <div className="userId"> {item.user_id} </div>
                <div className="commentMessage"> {item.message} </div>
              </div>
              <div className="time"> {item.time} </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
