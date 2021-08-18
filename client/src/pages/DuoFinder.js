// React
import { Container } from "@material-ui/core";
import React from "react";
import MatchingCard from "../components/MatchingCard";
import FriendList from "../components/FriendList";

// DuoFinder
function DuoFinder() {
	return (
		<Container>
			<FriendList />
			<MatchingCard />
		</Container>
	);
}

// export DuoFinder
export default DuoFinder;
