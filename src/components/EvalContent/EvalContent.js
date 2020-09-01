import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";
import { getAccessToken } from '../../utils/firebaseUtils';
import { connect } from 'react-redux';
import { updateUserDetails } from './../../redux/user/user.actions';
import countries from './countries.js';
import TermsAndCondition from '../TermsAndCondition/TermsAndCondition';
import "./EvalContent.css";

let countryOptions = countries.map(country => (
	<option key={country} value={country}>
		{country}
	</option>
));

class EvalContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			signUpMethod: '',
			email: '',
			tel: '',
			address: '',
			image_url: '',
			visitedCountry: false,
			state: '',
			Age: '',
			countryVisited: '',
			country: '',
			yesBtnActive: false,
			pageNo: 1,
			showTermsOfService: true,
			isSigningUp: false,
			signUpStatus: '',
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
		const { errors } = this.props;

		if (Object.keys(errors).length > 0) return;

		this.setState({...data});
		
		if (this.state.pageNo === 5) {
			this.setState({ isSigningUp: true });
			this.completeSignUp();
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
								currentUser.additionalUserInfo?.profile?.given_name || ''
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
								currentUser.additionalUserInfo?.profile?.family_name || ''
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
								currentUser.additionalUserInfo?.profile?.email || ''
							}
							key="email"
							ref={register({ required: true })}
						/>
							{errors.email && <span role="alert" className="alert-error">This field cannot be empty</span>}
					</>
				)
			case 4:
				return (
					<>
						<select
							id='countries'
							name='ownCountry'
							key={"ownCountry"}
							ref={register({
								validate: value => value !== "Select home country"
							})}
						>
							<option value="Select home country"  defaultValue hidden>
								Select home country
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
			case 5:
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
							<div className='terms-container'>
								<input
									className='terms'
									id='terms'
									type='checkbox'
									name='terms'
									ref={register({
										required: true
									})}
								/>
								<label for='terms'>I agree to the <span className='show-terms' onClick={this.handleTermsChange}>Terms of Service</span></label>
							</div>
							{errors.terms && <span role="alert" className="alert-error alert-terms">You have to agree to our terms of service to complete your registration.</span>}
							{this.state.showTermsOfService &&
								<div
									onClick={() => this.setState({ showTermsOfService: false })}
									className='notification-modal notification-modal_terms'
								>
									<div className='notification-modal_content notification-modal_terms-content'>
										<TermsAndCondition />	
										<button onClick={() => this.setState({ showTermsOfService: false })}>CLOSE</button>
									</div>
								</div>
							}
					</div>
				);
			default:
				return <em> The end </em>;
		}
	};

	handleTermsChange = event => {
		event.preventDefault();
		this.setState({ showTermsOfService: true });
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
		if (this.state.pageNo > 1 && this.state.pageNo < 5) {
			return (
				<input
					type='submit'
					className='eval-next-btn'
					value="Next"
				/>
			);
		} else if (this.state.pageNo === 5) {
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
		if(this.state.Age){
			const age = parseInt(this.state.Age)
			if (age===0) return 1
			return age
		}
		return 1
	}

	completeSignUp = async e => {
		const { currentUser, history, updateUserDetails } = this.props;

		const addname = {
			"firstName": this.state.firstName,
			"lastName": this.state.lastName,
			"signUpMethod": currentUser.additionalUserInfo?.providerId || '',
			"email":this.state.email,
			"tel" : this.state.tel,
			"address": this.state.address,
			"image_url": currentUser.additionalUserInfo?.profile?.image_url || '',
			"travel_history": this.state.visitedCountry,
			"state": this.state.state,
			"age": this.setAge(),
			"countryVisited": this.state.countryVisited || '',
			"country": this.state.ownCountry,
		}

		updateUserDetails({...addname});
		
		try {
			const headers = {
				headers: {
					'access-token': await getAccessToken(),
				}
			};

			const signUpResult = await axios.post("https://fast-hamlet-28566.herokuapp.com/api/signup", addname, headers);
			if (signUpResult.status !== 200) {
				throw new Error("Couldn't sign user up", signUpResult);
			} else {
				let uid = signUpResult.data.uid
				console.log(uid, "uid");		
			};
			
			this.setState({ isSigningUp: false }, () => {
				this.setState({ signUpStatus: 'SUCCESS' }, () => {
					setTimeout(() => {
						history.push('/Patient');
					}, 1000);
				});
			});
		}	catch (error) {
			console.error(error);
			this.setState({ isSigningUp: false }, () => {
				this.setState({ signUpStatus: 'FAIL' }, () => {
					setTimeout(() => {
						this.setState({ signUpStatus: '' });
					}, 1000);
				});
			});
		}
	};

	render() {
		const { handleSubmit, currentUser } = this.props;

		if (currentUser === null) {
			return <Redirect to="/signup" />;
		}

		return (
			<div className='eval-content-container'>
				{ this.state.signUpStatus === 'FAIL'
				? <p className='signup-update'>Sorry, something went wrong during signup.</p>
				: this.state.signUpStatus === 'SUCCESS'
					? <p className='signup-update'>Signup complete.</p>
					: this.state.isSigningUp
						? <div className="loading"><img src={require('../../assets/loading.gif')} alt="loader"/></div>
						: <form onSubmit={handleSubmit(this.onSubmit)}>
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
	updateUserDetails: details => dispatch(updateUserDetails(details)),
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
