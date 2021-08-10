// React imports
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

// Utility imports
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// import SignUpVideo from "../assets/videos/1.mp4"
import { Box } from "@material-ui/core";

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
			<Container className="loginSignupForm">
				<Link to="/" className="loginFont">
					{" "}
					←Return to Login
				</Link>

				<h1 className="loginFont">Sign Up</h1>
				<form className="loginForm" id="SignUpForm" onSubmit={handleFormSubmit}>
					<Box>
						<Box m={2}>
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
						</Box>
						<Box m={2}>
							<label htmlFor="SummonerName"></label>
							<TextField
								fullWidth
								id="outlined-basic"
								label="Summoner Name"
								variant="outlined"
								placeholder="summonerName"
								name="summonerName"
								type="summonerName"
								id="summonerName"
								onChange={handleChange}
							/>
						</Box>
						<Box m={2}>
							<label htmlFor="email"></label>
							<TextField
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
							<label htmlFor="password"></label>
							<TextField
								fullWidth
								id="outlined-basic"
								label="Password"
								variant="outlined"
								placeholder="********"
								name="password"
								type="password"
								id="pwd"
								onChange={handleChange}
							/>
						</Box>
						<Button
							className="SignUpBtn"
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
			</Container>
		</div>
	);
}

export default SignUpForm;
