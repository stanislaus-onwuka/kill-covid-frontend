import React from './node_modules/react'
import "./Doctor-home.css"
import Report from "../../Components/DoctorHomeReports/DoctorHomeReports"
import ProfilePic from "../../Assets/avatar.svg"

const doctorHome = () => {
        return (
            <>
                <div className="dhomeContainer">
                    <div className="dhomeHeader">
                        <h1>Welcome Dr Emmanuel</h1>
                        <p>We appreciate your efforts in fighting covid-19<br />
                           Please check for recently sent reports
                        </p>
                        <input name="search-home" placeholder="Search" />
                    </div>
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