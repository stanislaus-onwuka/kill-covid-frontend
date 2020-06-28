import React from "react"
import "./prescription.css"


const prescription = ({ name,time }) => {
    time = time.split('=')
    return (
        <div className="prescribe">
            <h4>{name}</h4>
            <h4>{`Every ${time[1]} ${time[1]>=2 ? `${time[0]}` : `${time[0].slice(0,-1)}` } `}</h4>
        </div>
    );
}

export default prescription;