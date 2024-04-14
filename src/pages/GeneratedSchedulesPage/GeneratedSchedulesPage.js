import {React, useState} from "react";
import Schedule from "../../components/SchedulePageComponents/Schedule";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";
import Modal from "../../components/Modal/Modal";


const GeneratedSchedulesPage = ({ allSchedules }) => {

  const [openModalArray, setOpenModalArray] = useState(Array(allSchedules.length).fill(false));

  const handleClick = (index) => {
    let newModalArray =  [...openModalArray];
    newModalArray[index] = !openModalArray[index];
    setOpenModalArray(newModalArray);   
  }
  

  return (
    <div className="generated-schedules">
      <BackButton />
      <h1>Generated Schedules</h1>
      {allSchedules.map((schedule, index) => (
        <div key={`allSchedules_schedule_${index}`} className="schedule">
          {/* <h3>{index + 1}</h3> */}
         <button onClick={() => handleClick(index)} className="schedule_button"> Click to view Schedule {index + 1} </button>
          <Modal allSchedules={allSchedules} openModalArray={openModalArray} index={index} onClose={() => handleClick(index)}/>
          {schedule.map((classEntry) => (
            <div key={`per_schedule_${index}_per_classEntry_${classEntry.className}`} className="classEntry">
              <div className="class-name">{classEntry.className} </div>
              <div>
                {classEntry.id} {classEntry.professor}
              </div>
              {classEntry.time_and_locations.map((time_and_locations) => (
                <div key={`per_schedule_${index}_per_classEntry_${classEntry.className}_per_time_start_${time_and_locations.start_time}_and_end_${time_and_locations.end_time}`}>
                  {time_and_locations.location} |{" "}
                  {time_and_locations.weekday?.toString().replaceAll(",", " ")}{" "}
                  | {time_and_locations.start_time}
                  {time_and_locations.start_time == "" ? "" : "-"}
                  {time_and_locations.end_time}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GeneratedSchedulesPage;
