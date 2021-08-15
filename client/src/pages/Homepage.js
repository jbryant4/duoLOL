// React
import React from "react";

//components
import FriendList from "../components/FriendList";
import Header from "../components/Header";

// Material UI
import { Container, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
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
		background: "blue",
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

	const testFriends = ["Robert", "Cody", "Joeseph", "Nathan"];

	return (
		<Container>
			<Header />
			<Box className={classes.boxMain}>
				<Box className={classes.imageDiv}>
					<image>Placeholder for image</image>
				</Box>
				<Box className={classes.summonerDiv}>
					<h2>Summoner Name</h2>
					<h4>Rank</h4>
				</Box>
				<Box className={classes.duoDiv}>
					<h1>Find Your Duo</h1>
					<h4>Dashboard</h4>
				</Box>
			</Box>
			<Box className={classes.boxContainer}>
				<Box className={classes.friendList}>
					<h1>Friends List</h1>
					<FriendList name={testFriends} />
				</Box>
				<Box className={classes.matchHistory}>
					<Box className={classes.match}>
						<h1>Match History</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Vivamus at augue eget arcu dictum varius duis at i
						</p>
					</Box>
					<Box className={classes.match}>
						<h1>Match</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Vivamus at augue eget arcu dictum varius duis at i
						</p>
					</Box>
					<Box className={classes.match}>
						<h1>Match</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Vivamus at augue eget arcu dictum varius duis at i
						</p>
					</Box>
					<Box className={classes.match}>
						<h1>Match</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Vivamus at augue eget arcu dictum varius duis at i
						</p>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}

// export Homepage
export default Homepage;
