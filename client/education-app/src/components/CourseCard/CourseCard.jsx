import React from "react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  course_title,
  description,
  end_date,
  start_date,
  data,
}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/course/${data.course_id}`);
  }
  return (
    <div
      style={{
        // maxWidth: "350px",
        // width: "80%",
        // maxWidth: "18.75rem",
        // maxHeight: "200px",
        height: "18.375rem",
        // boxShadow: "0px 0px 7px 0px lightgray",
        border: "2px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "10px",
        padding: "1rem",
      }}
      onClick={handleClick}
    >
      <h2>{course_title}</h2>
      <p>{description}</p>
      <p>
        {start_date} - {end_date}
      </p>
    </div>
  );
}
