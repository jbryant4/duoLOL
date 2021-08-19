// React
import React, { useState } from "react";

// Material UI
import { Container, Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

//Component
import Header from "../components/Header";
import ChampionCard from "../components/ChampionCard";
import Champ from "../components/ChampInfo";
import Navbar from "../components/Navbar";

//import Riot Data with query
import { useQuery } from "@apollo/client";
import { QUERY_CHAMPIONS } from "../utils/queries";

// Styles
const useStyles = makeStyles({
	selectChampion: {
		margin: "10px",
	},

	paperClass: {
		backgroundColor: "var(--tertiaryColor)",
		boxShadow: "inset 0px 0px 20px black",
		borderRadius: "5%"
	},

	title: {
		backgroundColor: "var(--secondaryColor)",
		boxShadow: "inset 0 0 10px black",
		display: "flex",
		justifyContent: "center",
		fontWeight: "bold",
		color: "var(--primaryColor)",
		marginTop: "10px",
		borderRadius: "35% 0%",
	},
});

// AboutChampion page
const AboutChampion = () => {
	const [champ, setChamp] = useState(null);
	const [imgIndex, setImgIndex] = useState(0);
	const classes = useStyles();

	const { loading, data, error } = useQuery(QUERY_CHAMPIONS);
	if (error) {
		console.log(error);
	}

	const champions = data?.champions || [];

	// console.log(champ);

	return (
		<section>
			<Navbar />
			<Container maxWidth="lg">
				<Header />
				<Grid container>
					<Grid item xs={12} sm={12} md={3} lg={3}>
						<div className={classes.title}>
							<h2>Select a Champion</h2>
						</div>
						<Box className={classes.selectChampion}>
							<ChampionCard
								champions={champions}
								setChamp={setChamp}
								champ={champ}
								imgIndex={imgIndex}
								setImgIndex={setImgIndex}
							/>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={9} lg={9}>
						<Paper className={classes.paperClass}>
							<Box>
								{champ && (
									<Champ
										champ={champ}
										imgIndex={imgIndex}
										setImgIndex={setImgIndex}
									/>
								)}
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</section>
	);
};

// export AboutChampion
export default AboutChampion;
