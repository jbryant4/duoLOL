// React imports
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

// Utility imports
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// import loginVideo from "../assets/videos/1.mp4"
import { Box } from "@material-ui/core";

// Login Function
function LoginForm(props) {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error }] = useMutation(LOGIN);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const {data} = await login({
				variables: { email: formState.email, password: formState.password },
			});
			Auth.login(data.login.token);
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
		<Box>
			<form className="loginForm" id="loginForm" onSubmit={handleFormSubmit}>
				<h1 className="loginFont">Login</h1>
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
						) : (
							<TextField
								fullWidth
								id="outlined-basic"
								label="Email"
								variant="outlined"
								name="email"
								type="email"
								id="email"
								onChange={handleChange}
							/>
						)}
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
						) : (
							<TextField
								fullWidth
								id="outlined-basic"
								label="Password"
								variant="outlined"
								name="password"
								type="password"
								id="pwd"
								onChange={handleChange}
							/>
						)}
					</Box>
					{error ? (
						<div>
							<p className="error-text">
								The provided credentials are incorrect.
							</p>
						</div>
					) : null}
					<Button
						className="loginSignBtn"
						variant="contained"
						color="primary"
						size="medium"
						type="submit"
						form="loginForm"
					>
						Login
					</Button>

				</Box>
			</form>
		</Box>
	);
}

//export Login
export default LoginForm;
