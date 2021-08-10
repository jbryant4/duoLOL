// React imports
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
// Utility imports
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import loginVideo from "../assets/videos/1.mp4"



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
		<div className="container my-1" >
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
			<main className="loginSignupForm">
				<h1 className="loginFont">Login</h1>
				<form onSubmit={handleFormSubmit}>
					<div className="flex-row space-between my-2">
						<label htmlFor="email"></label>
						<TextField id="outlined-basic" label="Email" variant="outlined"
							placeholder="email"
							name="email"
							type="email"
							id="email"
							onChange={handleChange}
						/>
					</div>
					<div className="flex-row space-between my-2">
						<label htmlFor="pwd"></label>
						<TextField id="outlined-basic" label="Password" variant="outlined"
							placeholder="password"
							name="password"
							type="password"
							id="pwd"
							onChange={handleChange}
						/>
					</div>
					{error ? (
						<div>
							<p className="error-text">The provided credentials are incorrect</p>
						</div>
					) : null}
					<div className="flex-row flex-end">
						<button type="submit">Login</button>
					</div>
				</form>
			</main>
		</div>

	);					
}

//export Login
export default Login;
