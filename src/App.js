import './App.css';
import CourseCard from './components/CourseCard/CourseCard';
import React, {useState} from 'react';
import ExampleData from './ExampleData';


function App() {
  return (
    <div className='container'>
      good morning bois
      {/* The following is to test and visualize the CourseCard component */}
      {ExampleData.map((course, index) => (
        <CourseCard key={index} courses={[course]} />
      ))}
    </div>
  );
}

export default App;
