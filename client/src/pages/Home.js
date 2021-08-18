// React
import React from "react";

//components
import BuildList from '../components/BuildList'
import FriendList from "../components/FriendList";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

// Material UI
import { Container, Box, makeStyles, CardMedia, Card } from "@material-ui/core";
import MatchComponent from "../components/MatchComponent";

//gql
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

//page styles
const useStyles = makeStyles({
	containerFull: {
		minHeight: "100%",
		minWidth: "100%",
	},
	boxMain: {
		background: "aqua",
		display: "flex",
		flexDirection: "row",
		width: "100%",
	},
	imageDiv: {
		display: "flex",
		alignContent: "flex-start",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "15%",

	},
	summonerDiv: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		width: "35%",
	},
	duoDiv: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "nowrap",
		alignContent: "flex-end",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		width: "40%",
	},
	boxContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	friendList: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignContent: "center",
		width: "25%",
		alignItems: "center",
		justifyContent: "center",
		background: "teal",
	},
	matchHistory: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "column",
		alignContent: "flex-start",
		width: "75%",
		background: "blue",
	},
	match: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
	},
});

// Homepage
function Homepage() {
	const classes = useStyles();


	const { loading, data, error } = useQuery(QUERY_ME);
	if (loading) {
		return <h2>Loading...</h2>;
	}
	if (error) {
		console.log(error);
	}

	const me = data?.me || {};

	console.log(data);

	const testFriends = ["Robert", "Cody", "Joeseph", "Nathan"];

	return (
		<div>
			<Navbar />
			<Container>
				<Header />
				<Box className={classes.boxMain} >
					<Box className={classes.imageDiv}>
						<img alt={me.tier} src={`/ranked-emblems/${me.tier}.png`} className={classes.img} />
					</Box>
					<Box className={classes.summonerDiv}>
						<h2>{me.sumName}</h2>
						<h4>{me.tier} {me.rank}</h4>
					</Box>
					<Box className={classes.duoDiv}>

						<h4>Wins: {me.wins}</h4>
						<h4>losses: {me.losses}</h4>
					</Box>
				</Box>
				<Box className={classes.boxContainer}>
					<Box className={classes.friendList}>
						<h1>Friends List</h1>
						{me.friends ? <h2>Go make some friends with Duo  Finder</h2> :
							<FriendList name={me.friends} />
						}
					</Box>
					<Box className={classes.friendList}>
						<h1>Custom Builds</h1>
						<BuildList builds={me.builds} />
					</Box>
					<Box className={classes.boxContainer}>
						<Box className={classes.matchHistory}>
							<h1>Match History</h1>
							<Box className={classes.match}>
								<MatchComponent />
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
		</div>
	);
}

// export Homepage
export default Homepage;
