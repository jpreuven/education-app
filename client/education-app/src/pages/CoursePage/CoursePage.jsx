import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Course() {
  const { id } = useParams();
  const userData = useSelector((state) => state.user.value);
  const { course_title, description, start_date, end_date, students } =
    userData.courses.filter((course) => {
      return course.course_id == id;
    })[0];

  const studentList = students.map(({ email, first_name, last_name }) => {
    return (
      <h3>
        {first_name} {last_name}
      </h3>
    );
  });

  return (
    <div>
      <h1>{course_title}</h1>
      <p>{description}</p>
      <p>
        Start Date: {start_date} - End Date: {end_date}
      </p>
      <div>{studentList}</div>
    </div>
  );
}
