// React
import { Container } from "@material-ui/core";
import React from "react";

//component
import Build from "../components/BuildMaker";
import Navbar from "../components/Navbar";

// BuildABuild
function BuildABuild() {
	return (
		<div>
			<Navbar />
			<Container>
				<Build />
			</Container>
		</div>
	);
}

// export BuildABuild
export default BuildABuild;
