/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import "./doctorComment.css";
import Edit from "../../assets/pencil.png";
import Delete from "../../assets/trash.png";



const DoctorComment = () =>{
    return(
        <>
            <div className="comment">
                <div className="sub-section">
                        <h3>Dr Mina</h3>
                    <div>
                        <img src={Edit} alt="edit button"/>
                        <img src={Delete} alt="delete button"/>
                    </div>
                </div>
                <p>Hi Mike, Your vitals are looking pretty okay to me. Keep it up</p>
            </div>
        </>
    );
}

export default DoctorComment;