// React imports
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

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

// import SignUpVideo from "../assets/videos/1.mp4"
import { Box } from "@material-ui/core";

const iconsPool = [topIcon, jngIcon, midIcon, adcIcon, supIcon]

// Sign up function
function SignUpForm(props) {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [addUser] = useMutation(ADD_USER);


	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const mutationResponse = await addUser({
			variables: {
				email: formState.email,
				password: formState.password,
				firstName: formState.firstName,
				lastName: formState.lastName,
			},
		});
		const token = mutationResponse.data.addUser.token;
		Auth.login(token);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};



	return (
		<div>
			<form className="loginForm" id="SignUpForm" onSubmit={handleFormSubmit}>
				<h1 className="loginFont">Sign Up</h1>
				<Box>
					{/* <Box m={2}>
							<label htmlFor="userName"></label>
							<TextField
								fullWidth
								id="outlined-basic"
								label="User Name"
								variant="outlined"
								placeholder="User Name"
								name="UserName"
								type="UserName"
								id="UserName"
								onChange={handleChange}
							/>
						</Box> */}
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
							name="summonerName"
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

					<Box className="roleIcons"><h3>Choose your main and secondary role! Don't worry, you can change it later!</h3></Box>
					{/* <img src={midIcon} ></img> */}

					{iconsPool.map((src, index) => (<img src={src} key={index} />))}



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
			</form>
		</div>
	);
}

export default SignUpForm;
