import React from "react";
import "./Modal.css"

const times = [];

function create_schedule(schedule){
    console.log("in create schedule, schedule is: ", schedule);

    times.length = 0;
    let new_schedule = {}
    let hour = "";
    let half = "";

    for (let i = 8; i <= 21; i++) {
        // console.log("hour is: ", i);
        hour = `${i % 12 === 0 ? 12 : i % 12}:00 ${i < 12 ? 'AM' : 'PM'}`;
        half = `${i % 12 === 0 ? 12 : i % 12}:30 ${i < 12 ? 'AM' : 'PM'}`;
        times.push(hour);
        times.push(half);
        new_schedule[hour] = {"M": {}, "T": {}, "W": {}, "Th" : {}, "F": {}};
        new_schedule[half]= {"M": {}, "T": {}, "W": {}, "Th" : {}, "F": {}};
    }

    schedule.forEach(section => {

        console.log("well section is: ", section);
        let time_and_loc = section.time_and_locations;
        console.log("well time and locs is is: ", time_and_loc);

        time_and_loc.forEach(meeting => {
            let time = meeting.start_time;
            console.log("what is time: ", time);
            let hour = parseInt(time.split(":")[0]);
            let mins = parseInt(time.split(":")[1]);

            if(hour < 12){
                if(mins < 10){
                    time = `${hour}:${mins}0 AM`;
                }
                else{
                    time = `${hour}:${mins} AM`;
                }
            }
            else if(hour === 12){
                if(mins < 10){
                    time = `${hour}:${mins}0 PM`;
                }
                else{
                    time = `${hour}:${mins} PM`;
                }
            }
            else{
                if(mins < 10){
                    time = `${hour-12}:${mins}0 PM`;
                }
                else{
                    time = `${hour-12}:${mins} PM`;
                }
            }

            let end_time = meeting.end_time;
            let end_hour = parseInt(end_time.split(":")[0]);
            let end_mins = parseInt(end_time.split(":")[1]);

            let diff = (((end_hour * 60) + end_mins) - ((hour * 60) + mins));
            let prof = section.professor[0];
            prof = prof.split(",")[0];

            let class_obj = {className: section.className, professor: prof, location: meeting.location, rows: diff/30}

            let all_times = new_schedule[time];
            console.log("new_schedule is: ", new_schedule);
            console.log("well time is: ", time);
            console.log("all_times: ", all_times);
            meeting.weekday.forEach(day => {
                all_times[day] = class_obj
            });
        })
        
    });

    return new_schedule;
}

const Modal = ({allSchedules, openModalArray, index, onClose}) => {
    // console.log("in modal, openModal is: ", openModalArray);
    // console.log("in modal, openModal[index]: ", openModalArray[index]);
    // console.log("a schedule looks like: ", allSchedules[index]);
    if(openModalArray[index] === false){
        return null;
    }
    else{
        const temp_schedule = allSchedules[index];
        console.log("schedule is: ", temp_schedule);
        const new_schedule = create_schedule(temp_schedule);

        return (
            <div className="overlay">
                <div className="model_containers">
                    <div className="modal_right">
                        <button onClick={onClose} className="close">X</button>
                    </div>
                    <div className="schedule_container">
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
                                            <div className="name">{new_schedule[time]["M"].className || ""}</div>
                                            <div className="prof">{new_schedule[time]["M"].professor || ""}</div>
                                            <div className="loc">{new_schedule[time]["M"].location || ""}</div>
                                            
                                        </td>
                                        <td className="day">
                                            <div className="name">{new_schedule[time]["T"].className || ""}</div>
                                            <div className="prof">{new_schedule[time]["T"].professor || ""}</div>
                                            <div className="loc">{new_schedule[time]["T"].location || ""}</div>
                                        </td>
                                        <td className="day">
                                            <div className="name">{new_schedule[time]["W"].className || ""}</div>
                                            <div className="prof">{new_schedule[time]["W"].professor || ""}</div>
                                            <div className="loc">{new_schedule[time]["W"].location || ""}</div>
                                        </td>
                                        <td className="day">
                                            <div className="name">{new_schedule[time]["Th"].className || ""}</div>
                                            <div className="prof">{new_schedule[time]["Th"].professor || ""}</div>
                                            <div className="loc">{new_schedule[time]["Th"].location || ""}</div>
                                        </td>
                                        <td className="day">
                                            <div className="name">{new_schedule[time]["F"].className || ""}</div>
                                            <div className="prof">{new_schedule[time]["F"].professor || ""}</div>
                                            <div className="loc">{new_schedule[time]["F"].location || ""}</div>
                                        </td>
                                    </tr>
                                ))}
            
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;