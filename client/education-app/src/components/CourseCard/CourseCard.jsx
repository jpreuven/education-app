import React from "react";

export default function CourseCard({
  course_title,
  description,
  end_date,
  start_date,
}) {
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
    >
      <h2>{course_title}</h2>
      <p>{description}</p>
      <p>
        {start_date} - {end_date}
      </p>
    </div>
  );
}
