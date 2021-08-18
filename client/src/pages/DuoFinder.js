// React
import { Container } from "@material-ui/core";
import React from "react";

//components
import MatchingCard from "../components/MatchingCard";
import FriendList from "../components/FriendList";
import Navbar from "../components/Navbar";

// DuoFinder
function DuoFinder() {
	return (
		<div>
			<Navbar />
			<Container>
				<FriendList />
				<MatchingCard />
			</Container>
		</div>
	);
}

// export DuoFinder
export default DuoFinder;
