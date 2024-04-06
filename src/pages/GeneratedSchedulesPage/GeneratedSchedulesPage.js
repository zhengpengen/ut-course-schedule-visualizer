import React from 'react';
import Schedule from '../../components/SchedulePageComponents/Schedule';
import './GeneratedSchedulesPage.css';
import BackButton from '../../components/BackButton/BackButton';

const GeneratedSchedulesPage = () => {
  return (
    
    <div className="generated-schedules">
      <BackButton/>
      <h1>Generated Schedules</h1>
      <Schedule />
    </div>
  );
};

export default GeneratedSchedulesPage;
