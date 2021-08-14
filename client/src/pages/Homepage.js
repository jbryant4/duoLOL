// React
import React from "react";
//components
// import Friends from
import ImageAvatars from '../components/ImageAvatars'
import Header from "../components/Header";
// Material UI
import { Container, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	boxMain: {
		background: 'aqua',
		display: 'flex',
		flexDirection: 'row',
		width: '100%'
	},
	imageDiv: {
		display: 'flex',
		alignContent: 'flex-start',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '15%',
		background: 'blue'
	},
	summonerDiv: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '35%',
	},
	duoDiv: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'nowrap',
		alignContent: 'flex-end',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		width: '40%',

	},
	boxContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	friendList: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignContent: 'center',
		width: '25%',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'teal',
	},
	matchHistory: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignContent: 'flex-start',
		width: '75%',
		background: 'blue'
	},
	match: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	}
})

// Homepage
function Homepage() {
	const classes = useStyles();
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
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vivamus at augue eget arcu dictum varius duis at consectetur. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Vitae congue eu consequat ac felis donec et. Aliquam id diam maecenas ultricies. Sed odio morbi quis commodo odio aenean. Lacus sed viverra tellus in hac habitasse platea dictumst vestibulum. Ornare suspendisse sed nisi lacus sed viverra. Risus viverra adipiscing at in. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Tincidunt ornare massa eget egestas purus viverra accumsan. Nullam ac tortor vitae purus faucibus ornare suspendisse. Blandit volutpat maecenas volutpat blandit aliquam. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. At lectus urna duis convallis convallis tellus id. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. In dictum non consectetur a erat. Ut consequat semper viverra nam.

					</p>
				</Box>
				<Box className={classes.matchHistory}>
					<Box className={classes.match}>
						<h1>Match History</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vivamus at augue eget arcu dictum varius duis at i</p>
					</Box>
					<Box className={classes.match}>
						<h1>Match</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vivamus at augue eget arcu dictum varius duis at i</p>
					</Box>
					<Box className={classes.match}>
						<h1>Match</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vivamus at augue eget arcu dictum varius duis at i</p>
					</Box>
					<Box className={classes.match}>
						<h1>Match</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vivamus at augue eget arcu dictum varius duis at i</p>
					</Box>
				</Box>
			</Box>
		</Container>

	);
}

// export Homepage
export default Homepage;
