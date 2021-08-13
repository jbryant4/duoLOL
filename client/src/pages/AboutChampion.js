// React
import React, { useEffect } from "react";

// Material UI
import { Container, Box } from "@material-ui/core";

//Component
import Header from "../components/Header";
import ChampionCard from "../components/ChampionCard";

//import lol data
import { getChampList, aboutChamp } from '../utils/riotApi/riotApi'


// AboutChampion
function AboutChampion(props) {
	const champList = getChampList();
	console.log(champList)
	return (
		<section>
			<Container maxWidth="md">
				<Header />
				<Box className="championBox">
					<h2>Select a Champion to Learn More</h2>
					<ChampionCard />
				</Box>
				<Box color="text.primary" clone>
					<h1>Description goes here</h1>
				</Box>
			</Container>
		</section>
	);
}

// export AboutChampion
export default AboutChampion;
