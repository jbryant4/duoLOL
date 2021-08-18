// React
import { Container } from "@material-ui/core";
import React from "react";
import MatchingCard from "../components/MatchingCard";
import Chat from '../components/Chat';
import FriendList from "../components/FriendList";

// DuoFinder
function DuoFinder() {
	return (
		<Container>
			<FriendList />
			<MatchingCard />

			
			{/* //! move to proper area */}
			{/* <Chat /> */}
		</Container>
	);
}

// export DuoFinder
export default DuoFinder;
