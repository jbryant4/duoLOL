// React imports
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
// Utility imports
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import loginVideo from "../assets/videos/1.mp4"
import { Box } from "@material-ui/core";



// Login Function
function Login(props) {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error }] = useMutation(LOGIN);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationResponse = await login({
				variables: { email: formState.email, password: formState.password },
			});
			const token = mutationResponse.data.login.token;
			Auth.login(token);
		} catch (e) {
			console.log(e);
		}
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
			<video
				autoPlay loop muted
				style={{
					position: "absolute",
					width: "100%",
					left: "50%",
					top: "50%",
					height: "100%",
					objectFit: "cover",
					transform: "translate(-50%, -50%)",
					zIndex: "-1"
				}}
			>
				<source src={loginVideo} type="video/mp4" />
			</video>

			<Container
				className="loginSignupForm">
				<h1 className="loginFont">Login</h1>
				<form className="loginForm" id="loginForm" onSubmit={handleFormSubmit}>
					<Box>
						<Box m={2}>
							<label htmlFor="email"></label>
							{error ? (
								<TextField
									fullWidth
									error
									id="outlined-error"
									// label="Incorrect entry."
									defaultValue="Hello World"
									variant="outlined"
								/>
							) :
								<TextField
									fullWidth
									id="outlined-basic" label="Email" variant="outlined"
									placeholder="email"
									name="email"
									type="email"
									id="email"
									onChange={handleChange}
								/>
							}
						</Box>
						<Box m={2}>
							<label htmlFor="pwd"></label>
							{error ? (
								<TextField
									fullWidth
									error
									id="outlined-error-helper-text"
									// label="Incorrect entry."
									type="password"
									defaultValue="Hello World"
									variant="outlined"
								/>
							) : <TextField
								fullWidth
								id="outlined-basic" label="Password" variant="outlined"
								placeholder="password"
								name="password"
								type="password"
								id="pwd"
								onChange={handleChange}
							/>
							}
						</Box>
						{error ? (
							<div>
								<p className="error-text">The provided credentials are incorrect.</p>
							</div>
						) : null}
						<Button
							className="loginBtn"
							variant="contained"
							color="primary" size="medium"
							type="submit" form="loginForm"						   >
							Login
						</Button>

						<h3 className="bottomDiv">Doesn't have an account? Create one right now!</h3>

					</Box>
				</form>


			</Container>
		</div>

	);
}

//export Login
export default Login;
