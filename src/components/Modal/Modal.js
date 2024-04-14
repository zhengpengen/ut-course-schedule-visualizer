import React from "react";
import "./Modal.css"

const times = [];

function create_schedule(schedule){
    console.log("in create schedule, schedule is: ", schedule);

    times.length = 0;
    let new_schedule = {}
    let hour = "";
    let half = "";

    for (let i = 7; i <= 22; i++) {
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

            if(hour <= 12){
                time = `${hour}:${mins} AM`;
            }
            else{
                time = `${hour-12}:${mins} PM`;
            }

            let end_time = meeting.end_time;
            let end_hour = parseInt(end_time.split(":")[0]);
            let end_mins = parseInt(end_time.split(":")[1]);

            let diff = (((end_hour * 60) + end_mins) - ((hour * 60) + mins));


            let class_obj = {className: section.className, professor: section.professor, location: meeting.location, cols: diff/30}

            let all_times = new_schedule[time];
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
                        {/* <h1>YAHOOO WOOHOOO {index}</h1> */}
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
                                {times.map((time, index) => (
                                    <tr key={index}>
                                        <td className="time">{time}</td>
                                        <td className="day" colSpan={new_schedule[time]["M"].cols}> 
                                            {new_schedule[time]["M"].className ? new_schedule[time]["M"].className : ""}
                                        </td>
                                        <td className="day" colSpan={new_schedule[time]["T"].cols}> 
                                            {new_schedule[time]["T"].className ? new_schedule[time]["T"].className : ""}
                                        </td>
                                        <td className="day" colSpan={new_schedule[time]["W"].cols}> 
                                            {new_schedule[time]["W"].className ? new_schedule[time]["W"].className : ""}
                                        </td>
                                        <td className="day" colSpan={new_schedule[time]["Th"].cols}> 
                                            {new_schedule[time]["Th"].className ? new_schedule[time]["Th"].className : ""}
                                        </td>
                                        <td className="day" colSpan={new_schedule[time]["F"].cols}>
                                            {new_schedule[time]["F"].className ? new_schedule[time]["F"].className : ""} 
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