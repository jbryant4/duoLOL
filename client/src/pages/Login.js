// React imports
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import loginVideo from "../assets/videos/1.mp4"
import { Box, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";




// Login Function
function Login(props) {
	const [isLogin, setIsLogin] = useState(true)
	const loginSwitch = "Or login instead"
	const signUpSwitch = "Doesn't have an account? Click here and create one right now!"

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
			<Container className="loginSignupForm">
				<Box className="loginWrapper">
					{isLogin ? <LoginForm /> : <SignUpForm />}


					<Button className="switchFormBtn" onClick={() => setIsLogin(!isLogin)}>{isLogin ? signUpSwitch : loginSwitch}</Button>


				</Box>

			</Container>
		</div>

	);
}

//export Login
export default Login;
