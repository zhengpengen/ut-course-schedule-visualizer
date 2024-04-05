import React from "react";
import CourseCard from "../CourseCard/CourseCard";
import "./AllClassesList.css";
import {Draggable, Droppable} from "@hello-pangea/dnd";

const AllClassesList = ({
  unassigned_classes,
  setUnassignedClass
}) => {


  return (
    <div className="all-classes-list">
      <div className="unassigned col">
        <div className="title-box">Unassigned Classes</div>
        <div className="cards-container">
          <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {unassigned_classes.map((course, index) => (
                <Draggable key={course.course_name} draggableId={course.course_name} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <CourseCard key={index} courses={[course]} />
                    </div>
                  )}
                </Draggable>
            ))}
            </div>
          )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default AllClassesList;
