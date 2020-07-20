import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";
import { connect } from 'react-redux';

import { updateUserDetails } from './../../redux/user/user.actions';
import countries from './countries.js';
import "./EvalContent.css";


let ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let countryOptions = countries.map(country => (
	<option key={country} value={country}>
		{country}
	</option>
));
let ratingOptions = ratings.map(rating => (
	<option key={rating} value={rating}>
		{rating}
	</option>
));

class EvalContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			yesBtnActive: false,
			pageNo: 1,
			isCoughChecked: false,
			isFeverChecked: false,
			isFatigueChecked: false,
			isRespiratoryChecked: false,
			isOthersChecked: false,
			visitedCountry: false,
			formData: {}
		};
	}

	handleChange = (event,type) => {
		let name =  event.target.name;
		let value;
		if(type){
			value =  event.target.checked;
		}else{
			event.preventDefault();
			value = event.target.value;
		}

		this.setState({[name]: value})
	};

	switchPage = (e) => {
		if(e) e.preventDefault();
		this.setState(prevState => {
			return { pageNo: prevState.pageNo + 1 };
		});
	};

	onSubmit = (data) => {
		const { history, errors } = this.props;

		if (Object.keys(errors).length > 0) return;

		this.setState({
			formData: {
				...this.state.formData,
				...data
			}
		});

		if (this.state.pageNo === 6) {
			this.postDetails();
			history.push('/Patient');
			return;
		};

		this.switchPage();
	};

	renderComp = () => {
		const { register, errors, currentUser } = this.props;
		const { pageNo } = this.state;


		switch (pageNo) {
			case 1:
				return (
					<>
						<em>First, tell us a few things about you</em>
						<button className="eval-continue-btn" onClick={this.switchPage}>Continue</button>
					</>
				);
			case 2:
				return (
					<>
						<em> What is your name ? </em>
						<input
							className='eval-first-name-input'
							type='text'
							name='firstName'
							placeholder='First Name'
							defaultValue={
								currentUser.additionalUserInfo?.profile.given_name || ''
							}
							key="firstName"
							ref={register({ required: true })}
						/>
						{errors.firstName && <span role="alert" className="alert-error">This field cannot be empty</span>}

						<input
							className='eval-last-name-input'
							type='text'
							name='lastName'
							placeholder='Last Name'
							defaultValue={
								currentUser.additionalUserInfo?.profile.family_name || ''
							}
							key="lastName"
							ref={register({ required: true })}
						/>
						{errors.lastName && <span role="alert" className="alert-error">This field cannot be empty</span>}

						<em> How old are you ? </em>
						<input
							className='eval-first-name-input'
							type='number'
							name='Age'
							placeholder='Your Age'
							key='Age'
							ref={register({
								required: true,
								min: 18
							})}
						/>
						{
							errors.Age
							&& isNaN(errors.Age.ref.valueAsNumber)
							&& <span role="alert" className="alert-error">This field cannot be empty</span>
						}
						{
							errors.Age
							&& typeof(errors.Age.ref.valueAsNumber) === 'number'
							&& errors.Age.ref.valueAsNumber < 18
							&& <span role="alert" className="alert-error">Must be at least 18 years to register</span>
						}

					</>
				);
			case 3:
				return(
					<>
						<em>Contact Info</em>
						<input
							className='eval-first-name-input'
							type='text'
							name='tel'
							placeholder='Phone Number'
							defaultValue={
								currentUser.phoneNumber || ''
							}
							key="tel"
							ref={register({
								required: true,
								validate: value => !isNaN(value)
							})}
						/>
						{errors.tel && <span role="alert" className="alert-error">This field must contain a number</span>}

						<input
							className='eval-last-name-input'
							type='text'
							name='email'
							placeholder='Email'
							defaultValue={
								currentUser.additionalUserInfo?.profile.email || ''
							}
							key="email"
							ref={register({ required: true })}
						/>
							{errors.email && <span role="alert" className="alert-error">This field cannot be empty</span>}
					</>
				)
			case 4:
				return (
					<div>
						<em>In the last 14 days, have you traveled to any country? </em>
						<div className='yes-no-btn'>
							<button className='yes inactive' onClick={this.yesButtonClick}>
								Yes
							</button>
							<button className='inactive no' onClick={this.noButtonClick}>
								No
							</button>
						</div>

						{this.state.yesBtnActive &&
							<>
								<select
									id='countries'
									name='countryVisited'
									key={"phone_number"}
									ref={register({
										validate: value => value !== "select country"
									})}
								>
									<option value="select country"  hidden defaultValue>
										Select the country
									</option>
									{countryOptions}
								</select>
								{errors.countryVisited && <span role="alert" className="alert-error">A country has to be selected</span>}
							</>
							}
					</div>
				);
			case 5:
				return (
					<>
						<select
							id='countries'
							name='ownCountry'
							key={"ownCountry"}
							ref={register({
								validate: value => value !== "select your country"
							})}
						>
							<option value="select your country"  defaultValue hidden>
									Select the country
								</option>
							{countryOptions}
						</select>
						{errors.ownCountry && <span role="alert" className="alert-error">A country has to be selected</span>}

						<input
							className='eval-state-input'
							type='text'
							name='state'
							placeholder='State'
							key={"state"}
							ref={register({ required: true })}
						/>
						{errors.state && <span role="alert" className="alert-error">This field cannot be empty</span>}

						<input
							className='eval-address-input'
							type='text'
							name='address'
							placeholder='Address'
							key={"address"}
							ref={register({ required: true })}
						/>
						{errors.address && <span role="alert" className="alert-error">This field cannot be empty</span>}
					</>
				);
			case 6:
				return (
					<>
						<em>What symptoms are you showing ? </em>
						<div className='symptom-input'>
							<input
								className='radio-btns'
								type='checkbox'
								onChange={(e) => this.handleChange(e, 'checkbox')}
								name='isCoughChecked'
								id='cough'
								ref={register}
							/>
							<label htmlFor='cough'>Cough</label>
							{this.state.isCoughChecked
								? (
									<div className='rating'>
										<em>On a scale of 1-10, how serious is it ?</em>
										<select
											name='coughRate'
											ref={register}
										>
											{ratingOptions}
										</select>
									</div>
									)
								: null
								}
						</div>

						<div className='symptom-input'>
							<input
								className='radio-btns'
								type='checkbox'
								onChange={(e) => this.handleChange(e, 'checkbox')}
								id='fever'
								name='isFeverChecked'
								ref={register}
							/>
							<label htmlFor='fever'>Fever</label>
							{this.state.isFeverChecked ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='feverRate'
										id='rating'
										ref={register}
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>

						<div className='symptom-input'>
							<input
								className='radio-btns'
								type='checkbox'
								onChange={(e) => this.handleChange(e, 'checkbox')}
								id='fatigue'
								name='isFatigueChecked'
								ref={register}
							/>
							<label htmlFor='fatigue'>Fatigue</label>
							{this.state.isFatigueChecked ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='fatigueRate'
										id='rating'
										ref={register}
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>

						<div className='symptom-input'>
							<input
								className='radio-btns'
								type='checkbox'
								onChange={(e) => this.handleChange(e, 'checkbox')}
								id='respiratory'
								name='isRespiratoryChecked'
								ref={register}
							/>
							<label htmlFor='respiratory'>Respiratory Problems</label>
							{this.state.isRespiratoryChecked ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='respRate'
										id='rating'
										ref={register}
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>

						<div className='symptom-input'>
							<input
								className='radio-btns'
								type='checkbox'
								onChange={(e) => this.handleChange(e, 'checkbox')}
								id='others'
								defaultValue={false}
								name='isOthersChecked'
								ref={register}
							/>
							<label htmlFor='others'>Others</label>
							{this.state.isOthersChecked ? (
								<div className='rating'>
									<input
										className='eval-others-input'
										type='text'
										name='otherSymptoms'
										placeholder='What symptom ?'
										ref={register}
									/>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										name='otherRate'
										id='rating'
										ref={register}
									>
										{ratingOptions}
									</select>
								</div>
							) : (
								console.log()
							)}
						</div>
					</>
				);
			default:
				return <em> The end </em>;
		}
	};

	yesButtonClick = event => {
		event.preventDefault();
		try {
			document.querySelector(".active").classList.remove("active");
		} catch (err) {}

		event.target.classList.remove("inactive");
		event.target.classList.add("active");
		this.setState({ yesBtnActive: true, visitedCountry: true });
	};

	noButtonClick = event => {
		event.preventDefault();
		try {
			document.querySelector(".active").classList.remove("active");
		} catch (err) {}
		event.target.classList.remove("inactive");
		event.target.classList.add("active");
		this.setState({ yesBtnActive: false, visitedCountry: false });
	};

	displayContinueBtn = () => {
		if (this.state.pageNo > 1 && this.state.pageNo < 6) {
			return (
				<input
					type='submit'
					className='eval-next-btn'
					value="Next"
				/>
			);
		} else if (this.state.pageNo === 6) {
			return (
				<input
					type='submit'
					className='eval-next-btn'
					value="Submit"
				/>
			)
		}
	};

	setAge = () => {
		if(this.state.formData.Age){
			const age = parseInt(this.state.formData.Age)
			if (age===0) return 1
			return age
		}
		return 1
	}

	postDetails = async e => {
		const { accessToken, currentUser } = this.props;

		const addname = {
			// "access-token":'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTkyNjA4NjA2LCJqdGkiOiI2NmZlYzFhMy00YmEwLTRmMTYtYmQzYi01YjNmYzA1MjMyMjQiLCJleHAiOjE1OTI2MTk3NTJ9.qVCiqXkfjVn1vra4XIK1O0med5uh26tk1MlAbkuI',
			"firstName": this.state.formData.firstName,
			"lastName": this.state.formData.lastName,
			"signUpMethod": currentUser.additionalUserInfo?.providerId || '',
			"access-token": accessToken
		};
		const add_profile={
			"email":this.state.formData.email,
			"tel" : this.state.formData.tel,
			"age": this.setAge(),
			"state": this.state.formData.state,
			"address": this.state.formData.address,
			"country": this.state.formData.ownCountry,
			"countryVisited": this.state.formData.countryVisited
		}
		const add_symptoms = [
			//
			{
			"cough": this.state.formData.isCoughChecked,
			"fever": this.state.formData.isFeverChecked,
			"fatigue": this.state.formData.isFatigueChecked,
			"resp": this.state.formData.isRespiratoryChecked,
			"other": this.state.formData.otherSymptoms || ''},
			{"otherDegree": this.state.formData.otherRate || '',
			"coughDegree": this.state.formData.coughRate || '',
			"feverDegree": this.state.formData.feverRate || '',
			"fatigueDegree": this.state.formData.fatigueRate || '',
			"respDegree": this.state.formData.respRate || ''}
		];

		let signUpResult = await axios.post("https://fast-hamlet-28566.herokuapp.com/api/signup", addname);

		let uid = signUpResult.data.uid
		console.log(uid)

		const headers = {headers:{'access-token': accessToken}}

		const updateReduxStore = {
			...add_profile,
			...add_symptoms[0],
			...add_symptoms[1],
		}
		this.props.updateUserDetails(updateReduxStore);

		axios.post('https://fast-hamlet-28566.herokuapp.com/api/add_symptoms',add_symptoms,headers).then(res=>{
			console.log(res)
			console.log(res.data)
		})

		axios.put('https://fast-hamlet-28566.herokuapp.com/api/add_profile',add_profile,headers).then(res => {
			console.log(res);
			console.log(res.data)
		});
	};

	render() {
		const { handleSubmit, currentUser } = this.props;

		if (currentUser === null) {
			return <Redirect to="/signup" />;
		}

		return (
			<div className='eval-content-container'>
			{
				<form onSubmit={handleSubmit(this.onSubmit)}>
					{this.renderComp()}

					{this.displayContinueBtn()}
				</form>
			}
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
	updateUserDetails: details => dispatch(updateUserDetails(details))
})

const withReactHookForm = (Component) => (props) => {
	const { register, handleSubmit, errors, watch } = useForm();

	return (
		<Component
			{...props}
			register={register}
			handleSubmit={handleSubmit}
			errors={errors}
			watch={watch}
		/>
	)
}

export default withReactHookForm(connect(mapStateToProps, mapDispatchToProps)(EvalContent));
