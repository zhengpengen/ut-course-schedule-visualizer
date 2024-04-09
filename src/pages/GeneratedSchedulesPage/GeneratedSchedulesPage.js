import React from "react";
import Schedule from "../../components/SchedulePageComponents/Schedule";
import "./GeneratedSchedulesPage.css";
import BackButton from "../../components/BackButton/BackButton";

const GeneratedSchedulesPage = ({ allSchedules }) => {
  return (
    <div className="generated-schedules">
      <BackButton />
      <h1>Generated Schedules</h1>
      {allSchedules.map((schedule, index) => (
        <div className="schedule">
          <h3>{index + 1}</h3>
          {schedule.map((classEntry) => (
            <div className="classEntry">
              <div className="class-name">{classEntry.className}</div>
              <div>
                {classEntry.id} {classEntry.professor}
              </div>
              {classEntry.time_and_locations.map((time_and_locations) => (
                <div>
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
