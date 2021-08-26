// React imports
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import loginVideo from "../assets/videos/1.mp4";
import { Box, Container, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// components
import LoginNavbar from "../components/LoginNavbar";

// Login Function
function Login(props) {
	const [isLogin, setIsLogin] = useState(true);
	const loginSwitch = "Or login instead";
	const signUpSwitch =
		"Don't have an account? Click here and create one right now!";

	// responsiveness for break points
	const useStyles = makeStyles((theme) => ({
		onSmallScreen: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "wrap",
			alignContent: "center",
			alignSelf: "center",
			alignItems: "center",
			justifyContent: "center",
			width: "100%",
			backgroundColor: "white",
			[theme.breakpoints.up("sm")]: {
				display: "none",
			}
		},
		onLargeScreen: {
			backgroundColor: "white",
			maxWidth: "22% ",
			minHeight: "55%",
			position: "absolute",
			left: "10%",
			top: "18%",
			borderRadius: "10px",
			boxShadow: "10px 5px 5px rgba(0, 0, 0, 0.205)",
			textAlign: "center",
			[theme.breakpoints.down("sm")]: {
				display: "none"
			},
		},
		

	}))

	const classes = useStyles();

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
				<Box className={classes.onLargeScreen}>
					<Box className="loginWrapper">
						{isLogin ? <LoginForm /> : <SignUpForm />}
						<Button
							className="clickSpanLink"
							onClick={() => setIsLogin(!isLogin)}
						>
							{isLogin ?  signUpSwitch : loginSwitch}
						</Button>
					</Box>
					<Box>
						<p> Cupid LOL was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.</p>
					</Box>
				</Box>
				<Box className={classes.onSmallScreen}>
					<Box className="loginWrapper">
						{isLogin ? <LoginForm /> : <SignUpForm />}
						<Button
							className="clickSpanLink"
							style={{width: "100%"}}
							onClick={() => setIsLogin(!isLogin)}
						>
							{isLogin ? signUpSwitch : loginSwitch}
						</Button>
					</Box>
					<Box>
						<p> Cupid LOL was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games.  Riot Games does not endorse or sponsor this project.</p>
					</Box>
				</Box>
			</div>
		</Box>
	);
}

//export Login
export default Login;
