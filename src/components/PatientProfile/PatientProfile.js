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
			mildcough: false,
			mCoughRate: "",
			fatigue: false,
			fatigueRate: "",
			fever: false,
			feverRate: "",
			soreThroat: false,
			sThroatRate: "",
			difficultyBreathing: false,
			dBreathingRate: ""
		};
	}

	onButtonClick(page) {
		this.setState({ page }, () => {
			console.log(this.state.page);
		});
		let symptoms = [
			{
				cough: this.state.mildcough,
				fever: this.state.fever,
				fatigue: this.state.fatigue,
				resp: this.state.difficultyBreathing,
				other: "sore throat"
			},
			{
				otherDegree: this.state.sThroatRate,
				coughDegree: this.state.mCoughRate,
				feverDegree: this.state.feverRate,
				fatigueDegree: this.state.fatigueRate,
				respDegree: this.state.dBreathingRate
			}
		];
		if (page === "home") {
      console.log(symptoms);
			const token= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidWlkIjoiYzI4MTg4ZTgtMTMwMy00MjM2LWI1MDYtYzRjNmJlY2Y1ZDMyIiwiaWF0IjoxNTkzMzEzMTU2LCJleHAiOjE1OTMzMTY3ODEsImp0aSI6IjEwZGI1ZjIzLTJjZjktNDIxMy04ZmRmLThmOWZmY2MzMzNiMyJ9.ObJbGjv3fvfuh6YQIP97DV6BgJOBaxB_O1hPaAlwz8w'
      axios.post('https://fast-hamlet-28566.herokuapp.com/api/add_symptoms',symptoms,{headers:{'access-token':token}}).then(res=>{console.log(res.data)})
		}
	}
	handleChange = (event, type) => {
		let name = event.target.name;
		let value;
		if (type) {
			value = event.target.checked;
		} else {
			event.preventDefault();
			value = event.target.value;
		}

		this.setState({ [name]: value });
	};
	handleRateChange = e => {
		this.setState({ [e.target.name]: e.target.value });
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
						+ Add Symptoms{" "}
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
					></img>
					<h1>Add Symptoms</h1>
					<div className='select-boxes'>
						<div className='select-box'>
							<label htmlFor='mild-cough'>
								Cough
								<input
									type='checkbox'
									onClick={e => {
										this.handleChange(e, "checkbox");
									}}
									id='mild-cough'
									name='mildcough'
									value='mild-cough'
								/>
								<span className='check'></span>
							</label>
							{this.state.mildcough ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='mCoughRate'
										value={this.state.mCoughRate}
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


						<div className='spacing'></div>

						<div className='select-box'>
							<label htmlFor='fatigue'>
								Fatigue
								<input
									type='checkbox'
									onClick={e => {
										this.handleChange(e, "checkbox");
									}}
									id='fatigue'
									name='fatigue'
									value='fatigue'
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

						<div className='spacing'></div>

						<div className='select-box'>
							<label htmlFor='fever'>
								Fever
								<input
									type='checkbox'
									onClick={e => {
										this.handleChange(e, "checkbox");
									}}
									id='fever'
									name='fever'
									value='fever'
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

						<div className='spacing'></div>

						<div className='select-box'>
							<label htmlFor='sore-throat'>
								Sore Throat
								<input
									type='checkbox'
									onClick={e => {
										this.handleChange(e, "checkbox");
									}}
									id='sore-throat'
									name='soreThroat'
									value='sore-throat'
								/>
								<span className='check'></span>
							</label>
							{this.state.soreThroat ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='sThroatRate'
										value={this.state.sThroatRate}
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
							<label htmlFor='difficulty-breathing'>
								Difficulty Breathing
								<input
									type='checkbox'
									onClick={e => {
										this.handleChange(e, "checkbox");
									}}
									id='difficulty-breathing'
									name='difficultyBreathing'
									value='difficulty-breathing'
								/>
								<span className='check'></span>
							</label>
							{this.state.difficultyBreathing ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='dBreathingRate'
										value={this.state.dBreathingRate}
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
