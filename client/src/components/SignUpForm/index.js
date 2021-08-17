// React imports
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Grid from '@material-ui/core/Grid';

// Utility imports
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
// import iconsPool from "../../assets/images/RoleIcons/roleIconsPool";

import topIcon from "../../assets/images/RoleIcons/top.png"
import jngIcon from "../../assets/images/RoleIcons/jng.png"
import midIcon from "../../assets/images/RoleIcons/mid.png"
import adcIcon from "../../assets/images/RoleIcons/adc.png"
import supIcon from "../../assets/images/RoleIcons/sup.png"

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';

// import SignUpVideo from "../assets/videos/1.mp4"
import { Box, Checkbox, FormControl } from "@material-ui/core";
import { width } from "@material-ui/system";

const iconsPool = [
	{
		id: "top",
		src: topIcon
	},
	{
		id: "jng",
		src: jngIcon,
	},
	{
		id: "mid",
		src: midIcon
	},
	{
		id: "adc",
		src: adcIcon
	},
	{
		id: "sup",
		src: supIcon
	}
]



// Sign up function
const SignUpForm = () => {
	const [formState, setFormState] = useState({ email: '', sumName: '', password: '', roles: [] });
	const [addUser] = useMutation(ADD_USER);

	console.log(formState)
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		try {
			const { data } = await addUser({
				variables: formState
			});
			console.log()
			const token = data.addUser.token;
			Auth.login(token);
		} catch (err) {
			console.error(err);
		}

		setFormState({
			email: '',
			sumName: '',
			password: '',
			roles: []
		});

		return formState
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		console.log(event.target.name, event.target.value)

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const checkBox = (event) => {
		let role = event.target.name
		if (event.target.checked) {
			setFormState({ ...formState, roles: [...formState.roles, role] })
		}
		else {
			let newArray = formState.roles
			newArray.splice(newArray.indexOf(role), 1)
			setFormState({ ...formState, roles: newArray })
		}
	}

	return (
		<Box component="form"
			sx={{
				'& > :not(style)': { m: 1 },
			}}
			autoComplete="off"
			className="loginForm" id="SignUpForm" onSubmit={handleFormSubmit}
			display="block"
			overflow="hidden"
		>


			<h1 className="loginFont">Sign Up</h1>

			<Box m={2}>
				<label htmlFor="email"></label>
				<TextField
					required
					fullWidth
					id="outlined-basic"
					label="Email"
					variant="outlined"
					placeholder="email"
					name="email"
					type="email"
					id="email"
					onChange={handleChange}
				/>
			</Box>
			<Box m={2}>
				<label htmlFor="SummonerName"></label>
				<TextField
					required
					fullWidth
					id="outlined-basic"
					label="Summoner Name"
					variant="outlined"
					name="sumName"
					type="summonerName"
					id="summonerName"
					onChange={handleChange}
				/>
			</Box>
			<Box m={2}>
				<label htmlFor="password"></label>
				<TextField
					required
					fullWidth
					id="outlined-basic"
					label="Password"
					variant="outlined"
					name="password"
					type="password"
					id="pwd"
					onChange={handleChange}
				/>
			</Box>
			<Box
				className="roleIcons"><h4>Choose your main and secondary role!</h4>
			</Box>


			<Box display="flex" className="imagesContainer">
				{iconsPool.map((iconIndex, index) => (
					<Box className="checkboxContainer">
						<label class="checker">
							<input type="checkbox" onChange={checkBox} disabled={formState.roles.length >= 2 && formState.roles.indexOf(iconIndex.id) == -1} name={iconIndex.id} className="iconsCheckbox" id={iconIndex.id} />
							<img className="signupIcons" src={iconIndex.src} key={index} />
						</label>
					</Box>
				))}
			</Box>



			<Box>
				<Button
					className="loginSignBtn"
					variant="contained"
					color="primary"
					size="medium"
					type="submit"
					form="SignUpForm"
				>
					Sign Up
				</Button>
			</Box>
		</Box >

	);
}

export default SignUpForm;
