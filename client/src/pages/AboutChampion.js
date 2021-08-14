// React
import React from "react";

// Material UI
import { Container, Box } from "@material-ui/core"

//Component
import Header from "../components/Header";
import ChampionCard from "../components/ChampionCard";

// AboutChampion
function AboutChampion(props) {
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
