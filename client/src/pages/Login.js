// React imports
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";

import loginVideo from "../assets/videos/1.mp4"


// Login Function
function Login(props) {
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

			<LoginForm />

		</div>

	);
}

//export Login
export default Login;
