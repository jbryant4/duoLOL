// React
import React, { useEffect, useState } from "react";

//components
import BuildList from '../components/BuildList'
import FriendList from "../components/FriendList";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TopChamp from "../components/TopChamp"
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
		justifyContent: "center",
		backgroundColor: "var(--altPrimary)",
		color: "var(--secondaryColor)",
		boxShadow: "inset 0 0 35px black"
	},
	buildContainer: {
		backgroundColor: "var(--altSecondary)"
	},
	friendListContainer: {
		display: "flex",
		flexWrap: "wrap",
		height: 500,
		overflow: "scroll",
		overflowX: "hidden",
		flexDirection: "column",
		alignContent: "flex-start",
		justifyContent: "center",
		alignItems: "center",
		width: "30%",
		background: "var(--altSecondary)",
		color: "var(--primaryColor)",
		boxShadow: "inset 0 0 35px black"
	},
	matchHistory: {
		display: "flex",
		flexWrap: "wrap",
		height: 500,
		overflow: "scroll",
		overflowX: "hidden",
		flexDirection: "row",
		alignContent: "flex-start",
		justifyContent: "center",
		alignItems: "center",
		width: "30%",
		background: "var(--altSecondary)",
		color: "var(--primaryColor)",
		boxShadow: "inset 0 0 35px black"
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

		if (loading) {
			return <h2>Loading...</h2>;
		}
		if (error) {
			console.log(error);
			return
		}

		const me = data?.me || {};
		console.log(data)



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
						<h4>Wins: {me.wins}</h4>
						<h4>losses: {me.losses}</h4>
					</Box>
					<Box className={classes.duoDiv}>

					</Box>
				</Box>
				<Box className={classes.boxContainer}>
					<Box className={classes.friendListContainer}>
						<h1>Friends List</h1>
						{me.friends ? <h2>Go make some friends with Duo  Finder</h2> :
							<FriendList name={me.friends} />
						}
					</Box>
					<Box className={classes.buildList}>
						<h1>Custom Builds</h1>
						<Box  className={classes.buildContainer}>
						<BuildList builds={me.builds} />
						</Box>
					</Box>
					{/* <Box className={classes.boxContainer}> */}
						<Box className={classes.matchHistory}>
							<Box>
							<h1>Top Champs</h1>
							</Box>
							<Box className={classes.match}>
								{/* <MatchComponent champs={me.masteries}/> */}
								<TopChamp champsMastery={me.masteries}/>
							</Box>
						</Box>
					{/* </Box> */}
				</Box>
			</Container>
		</div>
	);
}

// export Home
export default Home;
