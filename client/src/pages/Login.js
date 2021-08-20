// React imports
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import loginVideo from "../assets/videos/1.mp4";
import { Box, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// components
import LoginNavbar from "../components/LoginNavbar";

// Login Function
function Login(props) {
	const [isLogin, setIsLogin] = useState(true);
	const loginSwitch = "Or login instead";
	const signUpSwitch =
		"Doesn't have an account? Click here and create one right now!";

	return (
		<Box>
			<LoginNavbar />
			<div>
				<video
					autoPlay
					loop
					muted
					style={{
						position: "absolute",
						width: "100%",
						left: "50%",
						top: "50%",
						height: "100%",
						objectFit: "cover",
						transform: "translate(-50%, -50%)",
						zIndex: "-1",
					}}
				>
					<source src={loginVideo} type="video/mp4" />
				</video>
				<Container className="loginSignupForm">
					<Box className="loginWrapper">
						{isLogin ? <LoginForm /> : <SignUpForm />}
						<Button
							className="switchFormBtn"
							onClick={() => setIsLogin(!isLogin)}
						>
							{isLogin ? signUpSwitch : loginSwitch}
						</Button>
					</Box>
					<Box>
						<p> Cupid LOL was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.</p>
					</Box>
				</Container>
			</div>
		</Box>
	);
}

//export Login
export default Login;
