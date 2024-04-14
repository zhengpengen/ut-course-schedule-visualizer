import React from "react";
import "./Modal.css"

const Modal = ({allSchedules, openModalArray, index, onClose}) => {
    // console.log("in modal, openModal is: ", openModalArray);
    // console.log("in modal, openModal[index]: ", openModalArray[index]);
    console.log("a schedule looks like: ", allSchedules[index]);
    if(openModalArray[index] === false){
        return null;
    }
    else{
        return (
            <div className="overlay">
                <div className="model_containers">
                    <div className="modal_right">
                        <button onClick={onClose} className="close">X</button>
                    </div>
                    <div className="schedule_container">
                        <h1>YAHOOO WOOHOOO {index}</h1>
                        {/* <table>
                            <tc>
                                <thead></thead>
                                <thead></thead>
                                <thead></thead>
                                <thead></thead>
                                <thead></thead>
                                <thead></thead>
                            </tc>
                        </table> */}

                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;