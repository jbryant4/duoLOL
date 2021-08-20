// React imports
import SignUpForm from "../components/SignUpForm";

// video
import loginVideo from "../assets/videos/1.mp4";

// SignUp Function
function SignUp(props) {
	return (
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
			<SignUpForm />
		</div>
	);
}

//export SignUp
export default SignUp;
