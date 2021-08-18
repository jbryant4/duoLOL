// React
import React from "react";

//components
import FriendList from "../components/FriendList";
import Header from "../components/Header";
import Chat from "../components/Chat"

// Material UI
import { Container, Box, makeStyles } from "@material-ui/core";
import MatchComponent from "../components/MatchComponent";

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
	const html = `<mainText><stats><attention>35</attention> Attack Damage<br><attention>30%</attention> Attack Speed<br><attention>200</attention> Health<br><attention>20</attention> Ability Haste</stats><br><li><passive>Threefold Strike:</passive> Attacks grant <speed>20 Move Speed</speed> for 3 seconds. If the target is a champion, increase your <scaleAD>base Attack Damage by 6%</scaleAD> for 3 seconds, stacking up to 5 times (Max increase <scaleAD>30% AD</scaleAD>).<li><passive>Spellblade:</passive> After using an Ability, your next Attack is enhanced with an additional <physicalDamage>(200% base Attack Damage) physical damage</physicalDamage> <OnHit>On-Hit</OnHit> (1.5s cooldown). <br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>3</attention> Attack Damage,  <attention>3</attention> Ability Haste, and <attention> 3</attention> Move Speed</mainText><br>`
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
					<h1>Match History</h1>
					<Box
						className={classes.match}
						dangerouslySetInnerHTML={{ __html: html }}
						/>
					<Box className={classes.match}>
						<MatchComponent />
					</Box>
				</Box>
			</Box>
			<Chat />
		</Container>
	);
}

// export Homepage
export default Homepage;
