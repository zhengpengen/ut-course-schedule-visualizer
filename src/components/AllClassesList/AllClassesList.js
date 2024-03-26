import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import ExampleData from '../../ExampleData';
import './AllClassesList.css';

const AllClassesList = () => {
    return (
      <div className="all-classes-list">
        <div className="title-box">
          Unassigned Classes
        </div>
        <div className="cards-container">
          {ExampleData.map((course, index) => (
            <CourseCard key={index} courses={[course]} />
          ))}
        </div>
      </div>
    );
  };
  
export default AllClassesList;

