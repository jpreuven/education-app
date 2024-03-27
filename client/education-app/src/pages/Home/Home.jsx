import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../app/features/users/userSlice";
import CourseCard from "../../components/CourseCard/CourseCard";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    fetch("http://localhost:5000/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          console.log("User logged out!");
          navigate("/");
          dispatch(setUser(null));
        } else {
          console.log("Something went wrong!");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  const userData = useSelector((state) => state.user.value);
  console.log(userData);
  const coursesJSX = userData.courses.map(
    ({ course_title, description, end_date, start_date }, index) => {
      return (
        <CourseCard
          key={index}
          course_title={course_title}
          description={description}
          end_date={end_date}
          start_date={start_date}
        />
      );
    }
  );

  return <div>{coursesJSX}</div>;
}
