import React, { Component } from "react";
import njwt from 'njwt';
import { connect } from 'react-redux';
import userImage from "./../../assets/prof.png";
import backIcon from "./../../assets/svg/arrow-left.svg";
import ActivitySchedule from "../ActivitySchedule/ActivitySchedule";
import ProfilePicUploader from "../ProfilePicUploader/profile-pic-uploader";
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
			otherName: '',
			otherRate: "",
			temp: '',
			openUploader:false

		};
	}

	onButtonClick(page) {
		this.setState({ page }, () => {
			console.log(this.state.page);
		});
		
		const {userId} = this.props
		console.log(userId)
		let symptoms = [
			{
				cough: this.state.cough,
				fever: this.state.fever,
				fatigue: this.state.fatigue,
				resp: this.state.resp,
				other: this.state.otherName
			},
			{
				otherDegree: this.state.otherRate,
				coughDegree: this.state.coughRate,
				feverDegree: this.state.feverRate,
				fatigueDegree: this.state.fatigueRate,
				respDegree: this.state.respRate
			}
		];
		console.log(symptoms)
		if (page === "home") {
			console.log(symptoms);
			const token= this.generateAccessToken(userId)
			axios.post('https://fast-hamlet-28566.herokuapp.com/api/add_symptoms',
			symptoms,{headers:{'access-token':token}})
			.then(res=>{console.log(res.data)})
			.catch(err=>console.log(err))
		}
	}

	generateAccessToken = uid => {
		let claims = {
		 "sub": "1234567890",
		 "iat": 1592737638,
		 "exp": 1592741238,
		 "uid": uid
		};
			let jwt = njwt.create(claims, "secret", "HS256");
		let token = jwt.compact();
		return token;
	};

	handleRateChange = e => {
		const { name,value } = e.target
		this.setState({ [name]: value });
	};

	handleCheckboxChange = e => {
		const { name,checked } = e.target
		this.setState({ [name]: checked });
	};

	showUploader = () =>{
		this.setState({openUploader:!this.state.openUploader})
	};

	setDisplay() {
		if (this.state.page === "home") {
			return (
				<div className='patient-profile-container'>
					<h1>My Account</h1>
					<div className='patient-info'>
						<img src={userImage} alt='patient' className="patient-profile-picture"/>
						<em>{this.props.firstName + " " + this.props.lastName}</em>
						<button className="upload-profile-picture-btn" onClick={this.showUploader}>
							<img src={require('../../assets/svg/camera.svg')} alt="Upload a profile"/>
						</button>
					</div>
					<ProfilePicUploader showUploader={this.showUploader} openUploader = {this.state.openUploader}/>
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
						className="update-records-btn"
						onClick={() => {
							this.onButtonClick("symptom");
						}}
					>
						{" "}
						+ Update Records{" "}
					</button>
          <ActivitySchedule guides={this.props.guides} setUserGuides={this.props.setUserGuides}/>
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
									<em>Body Temperature</em>
									<input
										type='number'
										name='feverRate'
										value={this.state.feverRate}
										onChange={this.handleRateChange}
										id='rating'
									/>
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
									<input type='text' 
									name='otherName' 
									value={this.state.otherName}
									onChange={this.handleRateChange} 
									placeholder='What symptoms are you showing' />
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

const mapStateToProps = state => ({
	userId: state.user.currentUser.user_id
})

export default connect(mapStateToProps)(PatientProfile);
