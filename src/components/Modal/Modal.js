import React from "react";
import "./Modal.css"

const times = [];

function create_schedule({schedule}){
    times.length = 0;
    for (let hour = 7; hour <= 22; hour++) {
        console.log("hour is: ", hour);
        times.push(`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`);
        times.push(`${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'}`);
    }

    


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
        create_schedule({temp_schedule});

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
                                    <th className="header"> FRIDAY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {times.map((time, index) => (
                                    <tr key={index}>
                                        <td className="time">{time}</td>
                                        <td className="day">hi</td>
                                        <td className="day">cry</td>
                                        <td className="day">bye</td>
                                        <td className="day">pie</td>
                                        <td className="day">oh my</td>
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