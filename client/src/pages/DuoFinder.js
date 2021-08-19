// React
import { Container } from "@material-ui/core";
import React from "react";

//components
import MatchingCard from "../components/MatchingCard";
import FriendList from "../components/FriendList";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

// DuoFinder
function DuoFinder() {
	return (
		<div>
			<Navbar />
			<Container>
				<Header />
				<FriendList />
				<MatchingCard />
			</Container>
		</div>
	);
}

// export DuoFinder
export default DuoFinder;
