// React
import React from "react";

//components
import BuildList from '../components/BuildList'
import FriendList from "../components/FriendList";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TopChamp from "../components/TopChamp"
// Material UI
import { Container, Box, makeStyles } from "@material-ui/core";

//gql
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import FriendSug from "../components/FriendSug";

import Auth from "../utils/auth"
import { Redirect } from "react-router-dom";

//page styles
const useStyles = makeStyles({
	containerFull: {
		minHeight: "100%",
		minWidth: "100%",
	},
	boxMain: {
		background: "var(--tertiaryColor)",
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		boxShadow: "inset 0 0 35px black"
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
	buildList: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignContent: "center",
		width: "40%",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "var(--altPrimary)",
		color: "var(--secondaryColor)",
		boxShadow: "inset 0 0 35px black"
	},
	buildContainer: {
		backgroundColor: "var(--altSecondary)"
	},
	friendListContainer: {
		display: "flex",
		flexDirection: 'column',
		flexWrap: "no wrap",
		height: 700,
		overflow: "scroll",
		overflowX: "hidden",
		flexDirection: "column",
		alignContent: "center",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "30%",
		background: "var(--altSecondary)",
		color: "var(--primaryColor)",
		boxShadow: "inset 0 0 35px black",
		scrollbarColor: "black"
	},
	matchHistory: {
		display: "flex",
		flexWrap: "wrap",
		height: 700,
		overflow: "scroll",
		overflowX: "hidden",
		flexDirection: "row",
		alignContent: "flex-start",
		justifyContent: "center",
		alignItems: "center",
		width: "30%",
		background: "var(--altSecondary)",
		color: "var(--primaryColor)",
		boxShadow: "inset 0 0 35px black",

	},
	match: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	img: {
		maxHeight: 250,
	},
});

// Home
function Home() {
	const classes = useStyles();

	const { loading, data, error } = useQuery(QUERY_ME);

	//redirect
	if (!Auth.loggedIn()) {
		return <Redirect to='/' />
	}

	if (loading) {
		return <h2>Loading...</h2>;
	}
	if (error) {
		console.log(error);
		return
	}

	const me = data?.me || {};
	console.log(me)



	return (
		<Container maxWidth="lg">
			<Navbar />
			<Container maxWidth="lg">
				<Header />
				<Box className={classes.boxMain} >
					<Box className={classes.imageDiv}>
						<img alt={me.tier} src={`/ranked-emblems/${me.tier}.png`} className={classes.img} />
					</Box>
					<Box className={classes.summonerDiv}>
						<h2>{me.sumName}</h2>
						{console.log(me.tier)}
						{me.tier !== "unranked" ?
							
							<h4>{me.tier} {me.rank} <br/> Wins: {me.wins} <br/> losses: {me.losses}</h4>
						
						: <h4> has not yet played any ranked games</h4>
					}
					</Box>
					<Box className={classes.duoDiv}>
						<img alt='logo' src="/images/cupid_lol_static.png" style={{
							width: "55%",
							transform: "rotate(15deg)"
						}} />
					</Box>
				</Box>
				<Box className={classes.boxContainer}>
					<Box className={classes.friendListContainer}>
						<h2>Recommended Friends</h2>
						<FriendSug
							currentFriends={me.friends}
							me={me._id}
							style={{ overflow: "scroll" }}
						/>
						<h1 width='100%'>Friends List</h1>
						<FriendList friends={me.friends} />
					</Box>
					<Box className={classes.buildList}>
						<h1>Custom Builds</h1>
						<Box className={classes.buildContainer}>
							<BuildList builds={me.builds} />
						</Box>
					</Box>
					{/* <Box className={classes.boxContainer}> */}
					<Box className={classes.matchHistory}>
						<Box>
							<h2>Most Played Champions</h2>
						</Box>
						<Box className={classes.match}>
							{/* <MatchComponent champs={me.masteries}/> */}
							<TopChamp champsMastery={me.masteries} />
						</Box>
					</Box>
					{/* </Box> */}
				</Box>
			</Container>
		</Container>
	);
}

// export Home
export default Home;
