import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "../../components/CourseCard/CourseCard";

export default function Home() {
  const userData = useSelector((state) => state.user.value);
  console.log(userData);
  const coursesJSX = userData.courses.map(
    ({ course_title, description, end_date, start_date, ...data }, index) => {
      return (
        <CourseCard
          key={index}
          course_title={course_title}
          description={description}
          end_date={end_date}
          start_date={start_date}
          data={data}
        />
      );
    }
  );

  return (
    <section
      style={{
        padding: "1.5rem 0 0 1.5rem",
        // padding: "1.5rem",
        // display: "flex",
        // justifyContent: "flex-start",
        // alignContent: "flex-start",
        // gap: "3rem",
        // flexWrap: "wrap",

        // No idea what these do:
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridTemplateRows: "min-content",

        gap: "1rem",
      }}
    >
      {coursesJSX}
    </section>
  );
}
