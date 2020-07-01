import React, { Component } from "react";
import userImage from "./../../assets/prof.png";
import backIcon from "./../../assets/svg/arrow-left.svg";
import ActivitySchedule from "../ActivitySchedule/ActivitySchedule";
import "./PatientProfile.css";
import axios from "axios";

let ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let ratingOptions = ratings.map(rating => (
	<option key={rating} value={rating}>
		{rating}
	</option>
));

class PatientProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "home",
			guides: this.props.guides,
			cough: false,
			coughRate: "",
			fever: false,
			feverRate: "",
			fatigue: false,
			fatigueRate: "",
			resp: false,
			respRate: "",
			other: false,
			otherRate: "",
			temp: ''
		};
	}

	onButtonClick(page) {
		this.setState({ page }, () => {
			console.log(this.state.page);
		});
		let symptoms = [
			{
				cough: this.state.cough,
				fever: this.state.fever,
				fatigue: this.state.fatigue,
				resp: this.state.resp,
				other: this.state.other
			},
			{
				otherDegree: this.state.otherRate,
				coughDegree: this.state.coughRate,
				feverDegree: this.state.feverRate,
				fatigueDegree: this.state.fatigueRate,
				respDegree: this.state.respRate
			}
		];
		if (page === "home") {
      console.log(symptoms);
			const token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidWlkIjoiYzI4MTg4ZTgtMTMwMy00MjM2LWI1MDYtYzRjNmJlY2Y1ZDMyIiwiaWF0IjoxNTkzMzEzMTU2LCJleHAiOjE1OTMzMTY3ODEsImp0aSI6IjEwZGI1ZjIzLTJjZjktNDIxMy04ZmRmLThmOWZmY2MzMzNiMyJ9.ObJbGjv3fvfuh6YQIP97DV6BgJOBaxB_O1hPaAlwz8w'
      axios.post('https://fast-hamlet-28566.herokuapp.com/api/add_symptoms',symptoms,{headers:{'access-token':token}}).then(res=>{console.log(res.data)})
		}
	}

	handleRateChange = e => {
		const { name,value } = e.target
		this.setState({ [name]: value });
	};

	handleCheckboxChange = e => {
		const { name,checked } = e.target
		this.setState({ [name]: checked });
	};

	setDisplay() {
		if (this.state.page === "home") {
			return (
				<div className='patient-profile-container'>
					<h1>My Account</h1>
					<div className='patient-info'>
						<img src={userImage} alt='patient'></img>
						<em>{this.props.firstName + " " + this.props.lastName}</em>
					</div>
					<div className='quarantine'>
						<div className='objective'>
							<span>Quarantine</span>
							<span>Track your stay at home.</span>
						</div>
						<div className='countdown'>
							<span>8</span>
							<span>Days</span>
						</div>
					</div>
					<em className='date'>Started April 1.</em>
					<button
						onClick={() => {
							this.onButtonClick("symptom");
						}}
					>
						{" "}
						+ Update Records{" "}
					</button>
          <ActivitySchedule guides={this.props.guides}/>
				</div>
			);
		} else {
			return (
				<div className='patient-symptom-container'>
					<img
						onClick={() => {
							this.onButtonClick("home");
						}}
						src={backIcon}
						alt='back-icon'
					/>
					<h1>Add Symptoms</h1>
					<div className='select-boxes'>
						<div className='select-box'>
							<label htmlFor='cough'>
								Cough
								<input
									type='checkbox'
									onClick={this.handleCheckboxChange}
									id='cough'
									name='cough'
									value={this.state.cough}
								/>
								<span className='check'></span>
							</label>
							{this.state.cough ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='coughRate'
										value={this.state.coughRate}
										onChange={this.handleRateChange}
										id='rating'
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>

						<div className='spacing'></div>
						<div className='select-box'>
							<label htmlFor='fever'>
								Fever
								<input
									type='checkbox'
									onChange={this.handleCheckboxChange}
									id='fever'
									name='fever'
									value={this.state.fever}
								/>
								<span className='check'></span>
							</label>
							{this.state.fever ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='feverRate'
										value={this.state.feverRate}
										onChange={this.handleRateChange}
										id='rating'
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>
						<div className='select-box'>
							<label htmlFor='fatigue'>
								Fatigue
								<input
									type='checkbox'
									name='fatigue'
									value={this.state.fatigue}
									onChange={this.handleCheckboxChange}
									id='fatigue'
								/>
								<span className='check'></span>
							</label>
							{this.state.fatigue ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='fatigueRate'
										value={this.state.fatigueRate}
										onChange={this.handleRateChange}
										id='rating'
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>

						<div className='select-box'>
							<label htmlFor='resp'>
								Respiratory Problems
								<input
									type='checkbox'
									name='resp'
									value={this.state.resp}
									onChange={this.handleCheckboxChange}
									id='resp'
								/>
								<span className='check'></span>
							</label>
							{this.state.resp ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='respRate'
										value={this.state.respRate}
										onChange={this.handleRateChange}
										id='rating'
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>

						<div className='select-box'>
							<label htmlFor='other'>
								Others
								<input
									type='checkbox'
									onClick={this.handleCheckboxChange}
									id='other'
									name='other'
									value={this.state.other}
								/>
								<span className='check'></span>
							</label>
							{this.state.other ? (
								<div className='rating'>
									<input type='text' placeholder='What symptoms are you showing' />
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='otherRate'
										value={this.state.otherRate}
										onChange={this.handleRateChange}
										id='rating'
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>

						<div className='temp'>
							<label htmlFor='temp'> Body Temperature</label>
							<input type='number' name='temp' value={this.state.temp} id='temp' onChange={this.handleRateChange} />
						</div>
						<button
							onClick={() => {
								this.onButtonClick("home");
							}}
						>
							{" "}
							Submit{" "}
						</button>
					</div>
				</div>
			);
		}
	}

	render() {
		return this.setDisplay();
	}
}

export default PatientProfile;
