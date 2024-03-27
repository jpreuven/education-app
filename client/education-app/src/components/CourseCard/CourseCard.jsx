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
        maxWidth: "300px",
        boxShadow: "0px 0px 7px 0px lightgray",
        borderRadius: "10px",
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
