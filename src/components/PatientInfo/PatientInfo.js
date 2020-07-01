import React, { Component } from 'react';
import  virus from './../../assets/svg/virus.svg';
import  symptom from './../../assets/svg/symptom1.svg';
import  shield from './../../assets/svg/shield.svg';
import './PatientInfo.css';


// const PatientInfo = () => {
class PatientInfo extends Component {
  constructor() {
    super();
    this.state = {
      openTab: ''
    };
  }

  onTabClick(tab) {
    if (this.state.openTab === tab) {
      this.setState({ openTab: '' });
    } else {
      this.setState({ openTab: tab });
    }
  };

  render() {
    return(
      <div className="patient-info-container">
        <h1>Information</h1>
        <input type="text" placeholder="What do you want to know about COVID-19?" />
        <div className="info-tab" onClick={() => this.onTabClick('spread')}>
          {
            this.state.openTab !== 'spread' &&
             <div className="img-div img-virus">
                <img src={virus} alt="virus-icon"></img>
              </div>
          }
          <div className='text'>
            <h2>How it spreads</h2>
            { this.state.openTab !== 'spread'
              ? <p>Learn how COVID-19 spreads</p>
              : ( <>
                    <p>
                      According to <a href='https://www.webmd.com/lung/coronavirus-transmission-overview'>
                      webmd</a>, COVID-19 spreads mainly through person to person
                      contact, this can happen in various ways:
                    </p>
                    <br/>
                    <ul>
                      <li>
                       <b>Droplets:</b> When an infected person coughs, sneezes, or talks, droplets with
                       the virus fly into the air from their nose or mouth. Anyone who is within
                       6 feet of that person can breathe those droplets into their lungs.
                      </li>
                      <br />
                      <li>
                      <b>Aerosolized transmission:</b> Research shows that the virus can live in the air
                        for up to 3 hours. When you breathe air that has the virus floating in it,
                        it gets into your lungs.
                      </li>
                      <br />
                      <li>
                        <b>Surface transmission:</b> Another way to catch the new coronavirus is when you
                        touch surfaces that someone who has the virus has coughed or sneezed on.
                        You may touch a countertop or doorknob that's contaminated and then touch
                        your nose, mouth, or eyes. The virus can live on surfaces like plastic
                        and stainless steel for 2 to 3 days. To stop it, clean and disinfect
                        all counters, knobs, and other surfaces you and your family touch
                        several times a day.
                      </li>
                      <br />
                    </ul>
                  </>
                )
            }
          </div>
        </div>
        <div className="info-tab" onClick={() => this.onTabClick('symptoms')}>
          {
            this.state.openTab !== 'symptoms' &&
              <div className="img-div img-symptom">
                <img src={symptom} alt="symptom-icon"></img>
              </div>
          }
          <div className='text'>
            <h2>Symptoms</h2>
            { this.state.openTab !== 'symptoms'
              ? <p>Learn the symptoms of COVID-19</p>
              : (
                <>
                  <p>Common symptoms include:</p>
                  <ul>
                    <li>Fever</li>
                    <li>Dry Cough</li>
                    <li>Tiredness</li>
                    <li>Aches and Pains</li>
                    <li>Sore Throat</li>
                    <li>Diarrhoea</li>
                  </ul>
                  <br />
                  <p>More serious symptoms include:</p>
                  <ul>
                    <li>Difficulty breathing or Shortness of breath</li>
                    <li>Chest pain or Pressure</li>
                    <li>Loss of speech or movement</li>
                  </ul>
                </>)
            }
          </div>
        </div>
        <div className="info-tab" onClick={() => this.onTabClick('prevention')}>
          {
            this.state.openTab !== 'prevention' &&
              <div className="img-div img-prevention">
                <img src={shield} alt="shield-icon"></img>
              </div>
          }
          <div className='text'>
            <h2>Prevention</h2>
            { this.state.openTab !== 'prevention'
              ? <p>Learn prevention of COVID-19</p>
              :
              <>
                <p>
                Although, there is currently no known vaccine for COVID-19,
                here are some general guidelines you can follow to prevent getting
                infected:
                </p>
                <br />
                <ul>
                  <li>
                    <b>Wash your hands regularly:</b> Wash your hands regularly. Try to
                    wash your hands for at least 20 seconds each time.
                  </li>
                  <br />
                  <li>
                    <b>Avoid close contact:</b> COVID-19 is mainly spread through person to person
                    contact. Avoiding close contact greatly limits the chances of getting infected
                    in the first place. Try to avoid densly populated gatherings and places. Keep
                    at least 6 feet between yourself and any infected persons.
                  </li>
                  <br />
                  <li>
                    <b>Wear a face mask to cover your nose and mouth when around others:</b> The face mask is to
                    protect others so wear a face mask when you're around others. You can spread the virus even if you're
                    not showing any symptoms.
                  </li>
                  <br />
                  <li>
                    <b>Cover mouth and nose when coughing and sneezing:</b> Symptoms can take a while
                    to surface, so covering your mouth and nose when coughing and
                    sneezing helps reduce the amount of infected droplets you release into the surroundings.
                    This helps protect others from viruses that you could be carrying.
                  </li>
                  <br />
                  <li>
                    <b>Clean and disinfect surfaces regularly:</b> Regularly cleaning frequently touched surfaces
                    with disinfectant helps to kill viruses that might be on them.
                  </li>
                </ul>
              </>
            }
          </div>
        </div>
      </div>
    );
  }
}


export default PatientInfo;
