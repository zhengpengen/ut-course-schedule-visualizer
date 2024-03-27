import React, { useState, useEffect } from "react";
import "./CourseCard.css";

const colors = [
  "#aaffeb",
  "#aaccff",
  "#e9aaff",
  "#fdaaff",
  "#fff3aa",
  "#fff3aa",
  "#e9ffaa",
  "#aaffb2",
  "#acaaff",
  "#c5aaff",
  "#ffaadd",
  "#ffaaaa",
];

const CourseCard = ({ courses }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [courseColors, setCourseColors] = useState({});

  useEffect(() => {
    /* Ensure color doesn't change when dropdown clicked */
    const initialColors = {};
    courses.forEach((course) => {
      initialColors[course.course_number] =
        colors[Math.floor(Math.random() * colors.length)];
    });
    setCourseColors(initialColors);
  }, [courses]);

  const toggleSection = (id) => {
    setSelectedSection(selectedSection === id ? null : id);
  };

  return (
    <div className="course-card" draggable="true">
      {courses.map((course, index) => (
        <div
          key={index}
          className="card mb-3"
          style={{ backgroundColor: courseColors[course.course_number] }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light dropdown-button"
                onClick={() => toggleSection(course.course_number)}
              >
                ▼
              </button>
              <div className="course-info ms-2">
                <div className="fw-bold">{course.course_number}</div>
                <div>{course.course_name}</div>
              </div>
            </div>
            {selectedSection === course.course_number && (
              <ul className="list-group list-group-flush">
                {course.sections.map((section) => (
                  <li
                    key={section.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div>
                      <div className="fw-bold">{section.id}</div>
                      <div>{section.professor.join(", ")}</div>
                      {section.time_and_locations.map((time_location, idx) => (
                        <div key={idx} className="section-info">
                          <span>
                            {time_location.weekday.join(", ")} at{" "}
                            {time_location.location}
                          </span>
                          <span>
                            {" "}
                            | {time_location.start_time} -{" "}
                            {time_location.end_time}
                          </span>
                        </div>
                      ))}
                    </div>
                    <input type="checkbox" className="form-check-input" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;
