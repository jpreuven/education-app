import React from "react";
import "./PageHeader.css";

export default function PageHeader({
  course_title,
  description,
  start_date,
  end_date,
}) {
  return (
    <header className="course-page-header">
      <h1>{course_title}</h1>
      <p>{description}</p>
      <p>
        Start Date: {start_date} - End Date: {end_date}
      </p>
    </header>
  );
}
