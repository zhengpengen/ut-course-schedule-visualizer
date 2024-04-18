import React, { useState, useEffect, useRef } from "react";
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
const courseColorMapping = {};

const CourseCard = ({ courses, group_id, groupCards, setGroupCards, unassignedClasses, setUnassignedClass}) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [courseColors, setCourseColors] = useState({});
  const courseColorsRef = useRef({});


  useEffect(() => {
    courses.forEach((course) => {
      if (!courseColorMapping[course.course_name]) {
        courseColorMapping[course.course_name] = colors[Math.floor(Math.random() * colors.length)];
      }
    });
  }, [courses]);


  const toggleSection = (id) => {
    setSelectedSection(selectedSection === id ? null : id);
  };

  const handleCheckbox = (course, section) => {
    console.log("course is: ", course);
    console.log("section is: ", section);

    //in unassigned-classes
    if(group_id == -1){
      let new_classes = [...unassignedClasses];
      let curr_class = new_classes.find(course_class => course_class.course_name === course.course_name);
      let new_section = curr_class.sections.find(sect => sect.id === section.id);
      new_section.checked = !section.checked;

      setUnassignedClass(new_classes);
    }
    //in a group
    else{
      let new_groupCards = [...groupCards];
      let group = new_groupCards.find(group => group.id === group_id);
      let curr_class = group.classes.find(curr_class => curr_class.course_name === course.course_name);
      let new_section = curr_class.sections.find(sect => sect.id === section.id);
      new_section.checked = !section.checked;

      setGroupCards(new_groupCards);
    }
  }

  const handleDelete = (course) => {
    // console.log("course is: ", course);
    
    let new_array = null;
    for(let i = 0; i < unassignedClasses.length; i++){
      if(unassignedClasses[i].course_name === course.course_name){
        // console.log("entered handle delete card for unassigned classes!");
        new_array = [...unassignedClasses];
        new_array.splice(i, 1);
        setUnassignedClass(new_array);
        return;
      }
    }
    
    
    let group = null;
    let group_classes = null;

    for(let i = 0; i < groupCards.length; i++){
      group = groupCards[i];
      // console.log("group is: ", group);
      group_classes = group.classes;
      // console.log("group_classes: ", group_classes);

      for(let j = 0; j < group_classes.length; j++){

        if(group_classes[j].course_name === course.course_name){

          // console.log("entered handle delete card for group ", i);
          new_array = [...group_classes];
          new_array.splice(j, 1);

          let new_group = {...group};
          new_group.classes = new_array;

          let new_groupCards = [...groupCards];
          new_groupCards[i] = new_group;
          setGroupCards(new_groupCards);
          return;
        }
      }
    }




    
  }

  return (
    <div className="course-card">
      {courses.map((course, index) => (
        <div
          key={index}
          className="card mb-3"
          style={{ backgroundColor: courseColorMapping[course.course_name] }}
        >
          <div className="card-body">
          <p className="delete-button" onClick={() => handleDelete(course, index)}>X</p>
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
                    <input type="checkbox" className="form-check-input" checked={section.checked} onChange={() => handleCheckbox(course, section)}/>
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
