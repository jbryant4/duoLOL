// React
import { Container } from "@material-ui/core";
import React from "react";

//components
import MatchingCard from "../components/MatchingCard";
import Navbar from "../components/Navbar";

// DuoFinder
function DuoFinder() {
	return (
		<div>
			<Navbar />
			<Container>
				<MatchingCard />
			</Container>
		</div>
	);
}

// export DuoFinder
export default DuoFinder;
