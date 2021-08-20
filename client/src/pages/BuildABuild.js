// React
import { Container } from "@material-ui/core";
import React from "react";

//component
import Build from "../components/BuildMaker";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

import Auth from "../utils/auth"
import { Redirect } from "react-router-dom";
//redirect

// BuildABuild
function BuildABuild() {


	//redirect
	if (!Auth.loggedIn()) {
		return <Redirect to='/' />
	}

	return (
		<div>
			<Navbar />
			<Container>
				<Header />
				<Build />
			</Container>
		</div>
	);
}

// export BuildABuild
export default BuildABuild;
