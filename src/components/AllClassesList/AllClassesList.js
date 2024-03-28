import React from "react";
import CourseCard from "../CourseCard/CourseCard";
import "./AllClassesList.css";

const AllClassesList = ({
  unassigned_classes,
  setUnassignedClass,
  onDragOver,
}) => {
  return (
    <div className="all-classes-list">
      <div className="unassigned col">
        <div className="title-box">Unassigned Classes</div>
        <div className="cards-container">
          {unassigned_classes.map((course, index) => (
            <CourseCard key={index} courses={[course]} setCoords={null} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClassesList;
