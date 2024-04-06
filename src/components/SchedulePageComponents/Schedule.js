import React from "react";
import "./Schedule.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const courses = [
  {
    course_number: "331",
    course_name: "Algorithms And Complexity",
    weekday: ["M", "W", "F"],
    start_time: "10:00",
    end_time: "11:00",
    color: "#fdaaff",
  },
  {
    course_number: "346",
    course_name: "Cryptography",
    weekday: ["M", "F"],
    start_time: "14:00",
    end_time: "15:30",
    color: "#e9aaff",
  },
  {
    course_number: "347",
    course_name: "Data Management",
    weekday: ["T", "Th"],
    start_time: "14:00",
    end_time: "15:30",
    color: "#aaccff",
  },
  {
    course_number: "375",
    course_name: "Compilers",
    weekday: ["T", "Th"],
    start_time: "12:30",
    end_time: "14:00",
    color: "#aaffeb",
  },
];

const Schedule = () => {
  const getCourseForCell = (day, time) => {
    for (let course of courses) {
      if (
        course.weekday.includes(day) &&
        time >= course.start_time &&
        time < course.end_time
      ) {
        return course;
      }
    }
    return null;
  };

  return (
    <div className="schedule-container">
      <div className="row">
        <div className="col">&nbsp;</div>
        {days.map((day) => (
          <div key={day} className="col">
            {day}
          </div>
        ))}
      </div>
      {times.map((time) => (
        <div key={time} className="row">
          <div className="col">{time}</div>
          {days.map((day) => {
            const course = getCourseForCell(day[0], time);
            return (
              <div
                key={day + time}
                className="col"
                style={{ backgroundColor: course ? course.color : "#fff" }}
              >
                {course ? `${course.course_number} ${course.course_name}` : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
