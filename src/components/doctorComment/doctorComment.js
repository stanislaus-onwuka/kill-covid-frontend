import React from "react";
import "./doctorComment.css";

const DoctorComment = ({ name, content, date }) => {
  return (
    <>
      <div className="comment">
        <h3>{name}</h3>
        <p>{content}</p>
        <em>{date}</em>
      </div>
    </>
  );
};

export default DoctorComment;
