import React from "react";
import "./Modal.css";

const times = [];

function create_schedule(schedule) {
  times.length = 0;
  let new_schedule = {};

  // Populate times array
  for (let i = 8; i <= 21; i++) {
    let hour = `${i % 12 === 0 ? 12 : i % 12}:00 ${i < 12 ? "AM" : "PM"}`;
    let half = `${i % 12 === 0 ? 12 : i % 12}:30 ${i < 12 ? "AM" : "PM"}`;
    times.push(hour);
    times.push(half);
    new_schedule[hour] = { M: {}, T: {}, W: {}, Th: {}, F: {} };
    new_schedule[half] = { M: {}, T: {}, W: {}, Th: {}, F: {} };
  }
  console.log(schedule);
  // schedule.forEach((section) => {
  let time_and_loc = schedule[0].time_and_locations;
  console.log("time and loc is", time_and_loc);
  time_and_loc.forEach((meeting) => {
    let start_time = meeting.start_time;
    let end_time = meeting.end_time;
    let weekday = meeting.weekday;

    // Convert start and end times to minutes for easier calculation
    let start_hour = parseInt(start_time.split(":")[0]);
    let start_minutes = parseInt(start_time.split(":")[1]);
    let end_hour = parseInt(end_time.split(":")[0]);
    let end_minutes = parseInt(end_time.split(":")[1]);

    let start_total_minutes = start_hour * 60 + start_minutes;
    let end_total_minutes = end_hour * 60 + end_minutes;

    let duration_minutes = end_total_minutes - start_total_minutes;

    // Calculate number of rows the class should occupy
    let rows = duration_minutes / 30;

    // Populate schedule for each half-hour block
    for (let i = 0; i < rows; i++) {
      let current_time = new Date(0, 0, 0, start_hour, start_minutes + i * 30);
      let formatted_time = current_time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      weekday.forEach((day) => {
        console.log("formatted time is", formatted_time, "day is", day);
        console.log("professor is", schedule[0].professor);
        new_schedule[formatted_time][day] = {
          className: schedule[0].className,
          professor: schedule[0].professor[0].split(",")[0],
          location: meeting.location,
        };
      });
    }
  });
  // });

  return new_schedule;
}

const Modal = ({ allSchedules, index }) => {
  console.log("entered Modal", allSchedules, "with index ", index);

  if (allSchedules.length === 0) {
    return null;
  } else {
    const temp_schedule = allSchedules;
    // console.log("schedule is: ", temp_schedule);
    const new_schedule = create_schedule(temp_schedule);

    return (
      <div className="schedule_container">
        <p>something should be here</p>
        <table className="schedule_table">
          <thead>
            <tr className="top-line">
              <th className="t-header"></th>
              <th className="header">MONDAY</th>
              <th className="header">TUESDAY</th>
              <th className="header">WEDNESDAY</th>
              <th className="header">THURSDAY</th>
              <th className="header">FRIDAY</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time, timeIndex) => (
              <tr key={timeIndex}>
                <td className="time">{time}</td>
                <td className="day">
                  <div className="name">
                    {new_schedule[time]["M"].className || ""}
                  </div>
                  <div className="prof">
                    {new_schedule[time]["M"].professor || ""}
                  </div>
                  <div className="loc">
                    {new_schedule[time]["M"].location || ""}
                  </div>
                </td>
                <td className="day">
                  <div className="name">
                    {new_schedule[time]["T"].className || ""}
                  </div>
                  <div className="prof">
                    {new_schedule[time]["T"].professor || ""}
                  </div>
                  <div className="loc">
                    {new_schedule[time]["T"].location || ""}
                  </div>
                </td>
                <td className="day">
                  <div className="name">
                    {new_schedule[time]["W"].className || ""}
                  </div>
                  <div className="prof">
                    {new_schedule[time]["W"].professor || ""}
                  </div>
                  <div className="loc">
                    {new_schedule[time]["W"].location || ""}
                  </div>
                </td>
                <td className="day">
                  <div className="name">
                    {new_schedule[time]["Th"].className || ""}
                  </div>
                  <div className="prof">
                    {new_schedule[time]["Th"].professor || ""}
                  </div>
                  <div className="loc">
                    {new_schedule[time]["Th"].location || ""}
                  </div>
                </td>
                <td className="day">
                  <div className="name">
                    {new_schedule[time]["F"].className || ""}
                  </div>
                  <div className="prof">
                    {new_schedule[time]["F"].professor || ""}
                  </div>
                  <div className="loc">
                    {new_schedule[time]["F"].location || ""}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Modal;
