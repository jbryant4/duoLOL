// React
import { Container } from "@material-ui/core";
import React from "react";

//components
import MatchingCard from "../components/MatchingCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

//import query items
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

import Auth from "../utils/auth"
import { Redirect } from "react-router-dom";
// DuoFinder
function DuoFinder() {
	const { loading, error } = useQuery(QUERY_USERS);
	//redirect
	if (!Auth.loggedIn()) {
		return <Redirect to='/' />
	}

	
	if (loading) return <h2>Loading....</h2>;
	if (error) {
		console.log(error);
	}

	// const users = data?.user || [];

	return (
		<div>
			<Navbar />
			<Container>
				<Header />
				<MatchingCard />
			</Container>
		</div>
	);
}

// export DuoFinder
export default DuoFinder;
