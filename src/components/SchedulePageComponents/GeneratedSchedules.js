import React from 'react';
import Schedule from './Schedule';
import './GeneratedSchedules.css';
import BackButton from '../BackButton/BackButton';

const GeneratedSchedules = () => {
  return (
    
    <div className="generated-schedules">
      <BackButton/>
      <h1>Generated Schedules</h1>
      <Schedule />
    </div>
  );
};

export default GeneratedSchedules;
