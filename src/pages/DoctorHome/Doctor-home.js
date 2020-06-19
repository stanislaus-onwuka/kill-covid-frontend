import React from 'react'
import "./Doctor-home.css"
import Report from "./../../components/DoctorHomeReports/DoctorHomeReports"
import ProfilePic from "../../assets/avatar.svg"

const doctorHome = () => {
        return (
            <>
                <div className="dhomeContainer">
                    <div className="dhomeHeader">
                        <div className="dh-container">
                            <h1>Welcome Dr Emmanuel</h1>
                            <p>We appreciate your efforts in fighting covid-19<br/>
                            Please check for recently sent reports
                            </p>
                        </div>
                    </div>
                    <input name="search-home" className="search" />
                    <div className="reports">
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                        <Report profileImg={ProfilePic}
                            name="Paul Okoye"
                            grant="10/05/2020"
                            symptom="Dry Cough"
                        />
                    </div>
                </div>
            </>
        )

}

export default doctorHome;