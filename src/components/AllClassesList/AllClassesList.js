import React from "react";
import CourseCard from "../CourseCard/CourseCard";
import "./AllClassesList.css";
import {Draggable, Droppable} from "@hello-pangea/dnd";

const AllClassesList = ({
  groupCards,
  setGroupCards,
  unassigned_classes,
  setUnassignedClass,
  allClasses,
  setAllClasses
}) => {


  return (
    <div className="all-classes-list">
      <div className="unassigned col">
        <div className="title-box">Unassigned Classes</div>
        <div>
          <Droppable droppableId="all-classes">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="cards-container">
                {unassigned_classes.map((course, index) => (
                  <Draggable key={course.course_name} draggableId={course.course_name} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <CourseCard key={index} courses={[course]} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            </div>
          )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default AllClassesList;
