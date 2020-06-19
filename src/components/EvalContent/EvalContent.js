import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./EvalContent.css";
import axios from "axios";

let countries = [
	"select country",
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Antigua",
	"Argentina",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bhutan",
	"Bolivia",
	"Bosnia Herzegovina",
	"Botswana",
	"Brazil",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Comoros",
	"Congo(DR)",
	"Congo",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Estonia",
	"Ethiopia",
	"Fiji",
	"Finland",
	"France",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Grenada",
	"Guatemala",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea North",
	"Korea South",
	"Kuwait",
	"Kyrgyzstan",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Romania",
	"Russian Federation",
	"Rwanda",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Togo",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"United States",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican City",
	"Venezuela",
	"Vietnam",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];
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
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			state: "",
			address: "",
			countryVisited: null,
			ownCountry: "",
			otherSymptoms: "",
			otherRate: "",
			coughRate: "",
			feverRate: "",
			fatigueRate: "",
			respRate: "",
			yesBtnActive: false,
			pageNo: 1,
			isCoughChecked: false,
			isFeverChecked: false,
			isFatigueChecked: false,
			isRespiratoryChecked: false,
			isOthersChecked: false,
			visitedCountry: false
		};
	}

	switchPage = () => {
		this.setState(prevState => {
			return { pageNo: prevState.pageNo + 1 };
		});
	};

	renderComp = () => {
		const { pageNo } = this.state;
		switch (pageNo) {
			case 1:
				return (
					<>
						<em>First, tell us a few things about you</em>
						{/* eslint-disable-next-line */}
						<a href='#' onClick={this.switchPage}>
							{" "}
							Continue{" "}
						</a>
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
							value={this.state.firstName}
							onChange={this.onFirstNameChange}
						/>
						<input
							className='eval-last-name-input'
							type='text'
							name='lastName'
							placeholder='Last Name'
							value={this.state.lastName}
							onChange={this.onLastNameChange}
						/>
					</>
				);

			case 3:
				return (
					<div>
						<em> In the last 14 days, have you traveled to any country? </em>
						<div className='yes-no-btn'>
							<button className='yes inactive' onClick={this.yesButtonClick}>
								Yes
							</button>
							<button className='inactive no' onClick={this.noButtonClick}>
								No
							</button>
						</div>

						{this.state.yesBtnActive ? (
							<select
								id='countries'
								value={this.state.visitedCountry}
								onChange={this.handleSelectChange}
							>
								{/* <option value="select Country" disabled selected hidden>
									Select the country
								</option> */}
								{countryOptions}
							</select>
						) : (
							console.log()
						)}
					</div>
				);

			case 4:
				return (
					<>
						<select
							id='countries'
							value={this.state.ownCountry}
							onChange={this.handleOwnCountryChange}
						>
							{/* <option value="select Country" disabled selected hidden>
									Select the country
								</option> */}
							{countryOptions}
						</select>
						<input
							className='eval-state-input'
							type='text'
							name='state'
							placeholder='State'
							value={this.state.state}
							onChange={this.handleStateChange}
						/>
						<input
							className='eval-address-input'
							type='text'
							name='address'
							placeholder='Address'
							value={this.state.address}
							onChange={this.handleAddressChange}
						/>
					</>
				);
			case 5:
				return (
					<>
						<em>What symptoms are you showing ? </em>
						<div className='symptom-input'>
							<input
								className='radio-btns'
								type='checkbox'
								onClick={() => this.inputSelectClick(1)}
								id='cough'
								name='symptom'
								value='Cough'
							/>
							<label htmlFor='cough'>Cough</label>
							{this.state.isCoughChecked ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										value={this.state.coughRate}
										onChange={this.coughRate}
										id='rating'
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
								onClick={() => this.inputSelectClick(2)}
								id='fever'
								name='symptom'
								value='Fever'
							/>
							<label htmlFor='fever'>Fever</label>
							{this.state.isFeverChecked ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										value={this.state.feverRate}
										onChange={this.feverRate}
										id='rating'
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
								onClick={() => this.inputSelectClick(3)}
								id='fatigue'
								name='symptom'
								value='Fatigue'
							/>
							<label htmlFor='fatigue'>Fatigue</label>
							{this.state.isFatigueChecked ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										value={this.state.fatigueRate}
										onChange={this.fatigueRate}
										id='rating'
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
								onClick={() => this.inputSelectClick(4)}
								id='respiratory'
								name='symptom'
								value='Respiratory'
							/>
							<label htmlFor='respiratory'>Respiratory Problems</label>
							{this.state.isRespiratoryChecked ? (
								<div className='rating'>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										value={this.state.respRate}
										onChange={this.respRate}
										id='rating'
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
								onClick={() => this.inputSelectClick(5)}
								id='others'
								name='symptom'
								value='Others'
							/>
							<label htmlFor='others'>Others</label>
							{this.state.isOthersChecked ? (
								<div className='rating'>
									<input
										value={this.state.otherSymptoms}
										onChange={this.handlesymptomchange}
										className='eval-others-input'
										type='text'
										name='others'
										placeholder='What symptom ?'
									/>
									<em>On a scale of 1-10, how serious is it ?</em>
									<select
										value={this.state.othersRate}
										onChange={this.otherRate}
										id='rating'
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
		this.setState({ yesBtnActive: false });
	};
	inputSelectClick = number => {
		switch (number) {
			case 1:
				this.state.isCoughChecked
					? this.setState({ isCoughChecked: false })
					: this.setState({ isCoughChecked: true });
				break;
			case 2:
				this.state.isFeverChecked
					? this.setState({ isFeverChecked: false })
					: this.setState({ isFeverChecked: true });
				break;
			case 3:
				this.state.isFatigueChecked
					? this.setState({ isFatigueChecked: false })
					: this.setState({ isFatigueChecked: true });
				break;
			case 4:
				this.state.isRespiratoryChecked
					? this.setState({ isRespiratoryChecked: false })
					: this.setState({ isRespiratoryChecked: true });
				break;
			case 5:
				this.state.isOthersChecked
					? this.setState({ isOthersChecked: false })
					: this.setState({ isOthersChecked: true });
				break;
			default:
		}
	};
	displayContinueBtn = () => {
		if (this.state.pageNo > 1 && this.state.pageNo < 6) {
			return (
				<>
					{/* eslint-disable-next-line */}
					<button
						type='button'
						className='eval-next-btn'
						href='#'
						onClick={this.switchPage}
					>
						{" "}
						Next{" "}
					</button>
				</>
			);
		} else if(this.state.pageNo === 6){
			return(
			<>
			{/* eslint-disable-next-line */}
			<button
				type='Submit'
				className='eval-next-btn'
				href='#'
			>
				{" "}
				Submit{" "}
			</button>
		</>)
		}
		else if (this.state.pageNo === 7) {
			return (
				<>
					{/* eslint-disable-next-line */}
					<Link to='/Patient'className='eval-next-btn'>
							{" "}
							Finish{" "}
					</Link>
				</>
			);
		}
	};
	onFirstNameChange = e => {
		this.setState({ firstName: e.target.value });
	};
	onLastNameChange = e => {
		this.setState({ lastName: e.target.value });
	};
	handleSelectChange = e => {
		this.setState({ visitedCountry: e.target.value });
	};
	handleOwnCountryChange = e => {
		this.setState({ ownCountry: e.target.value });
	};
	handleStateChange = e => {
		this.setState({ state: e.target.value });
	};
	handleAddressChange = e => {
		this.setState({ address: e.target.value });
	};
	handlesymptomchange = e => {
		this.setState({ otherSymptoms: e.target.value });
	};
	feverRate = e => {
		this.setState({ feverRate: e.target.value });
	};
	coughRate = e => {
		this.setState({ coughRate: e.target.value });
	};
	respRate = e => {
		this.setState({ respRate: e.target.value });
	};
	fatigueRate = e => {
		this.setState({ fatigueRate: e.target.value });
	};
	otherRate = e => {
		this.setState({ otherRate: e.target.value });
	};
	postDetails = e => {
		e.preventDefault();
		const addname = {
			firstName: this.state.firstName,
			lastName: this.state.lastName
		};
		const add_symptoms = {
			state: this.state.state,
			address: this.state.address,
			countryVisited: this.state.countryVisited,
			ownCountry: this.state.ownCountry,
			otherSymptoms: this.state.otherSymptoms,
			otherRate: this.state.otherRate,
			coughRate: this.state.coughRate,
			feverRate: this.state.feverRate,
			fatigueRate: this.state.fatigueRate,
			respRate: this.state.respRate,
			yesBtnActive: this.state.yesBtnActive,
			isCoughChecked: this.state.isCoughChecked,
			isFeverChecked: this.state.isFeverChecked,
			isFatigueChecked: this.state.isFatigueChecked,
			isRespiratoryChecked: this.state.isRespiratoryChecked,
			isOthersChecked: this.state.isOthersChecked,
			visitedCountry: this.state.visitedCountry
		};
		axios.post("localhost:3000/eval", { addname }).then(res => {
			console.log(res);
			console.log(res.data);
		});
		axios.post("localhost:3000/eval", { add_symptoms }).then(res => {
			console.log(res);
			console.log(res.data);
		});
		this.switchPage()
		console.log(addname);
		console.log(add_symptoms);
	};

	render() {
		return (
			<div className='eval-content-container'>
				<form onSubmit={this.postDetails}>
					{this.renderComp()}

					{this.displayContinueBtn()}
				</form>
			</div>
		);
	}
}

export default EvalContent;
