// React
import React, { useEffect, useState } from "react";
// Material UI
import { Container, Box } from "@material-ui/core"

//Component
import Header from "../components/Header";
import ChampionCard from "../components/ChampionCard";
import Champ from "../components/ChampInfo"
//import Riot Data with query 

import { useQuery } from "@apollo/client";
import { QUERY_CHAMPIONS } from "../utils/queries"

// AboutChampion
const AboutChampion = () => {
	const [champ, setChamp] = useState(null)
	
	const { loading, data, error } = useQuery(QUERY_CHAMPIONS);
	if (error) { console.log(error) }

	const champions = data?.champions || []

	console.log(champ)

	return (
		<section>
			<Container maxWidth="md">
				<Header />
				<Box className="championBox">
					<h2>Select a Champion to Learn More</h2>
					<ChampionCard
						champions={champions}
						setChamp={setChamp}
						champ={champ} />
				</Box>
				{champ &&
					<Champ champ={champ} />
				}
			</Container>
		</section>
	);
}

// export AboutChampion
export default AboutChampion;
