import {React, useState} from "react";
import Schedule from "../../components/SchedulePageComponents/Schedule";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";
import Modal from "../../components/Modal/Modal";


const GeneratedSchedulesPage = ({ allSchedules }) => {

  // const [openModalArray, setOpenModalArray] = useState(Array(allSchedules.length).fill(false));
  console.log("sigh is: ", allSchedules);

  return (
    <div className="generated-schedules">
      <BackButton />
      <h1>Generated Schedules</h1>
      <div className="outer_box">
        {allSchedules.map((schedule, index) => (
          <div key={`allSchedules_schedule_${index}`} className="schedule">
            {/* <h3>{index + 1}</h3> */}
            {/* <button onClick={() => handleClick(index)} className="schedule_button"> Click to view Schedule {index + 1} </button> */}
            <div className="m_container"><Modal allSchedules={allSchedules} index={index} /></div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedSchedulesPage;
