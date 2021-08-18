// React
import React, { useEffect, useState } from "react";
// Material UI
import { Container, Box, Grid } from "@material-ui/core"

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
	const [imgIndex, setImgIndex] = useState(0);


	const { loading, data, error } = useQuery(QUERY_CHAMPIONS);
	if (error) { console.log(error) }

	const champions = data?.champions || []

	console.log(champ)

	return (
		<section>
			<Container maxWidth="md">
				<Header />
				<Grid container>
					<Grid item xs={12} sm={3} md={3} lg={3}>
						<Box className="championBox" >
							<h2>Select a Champion</h2>
							<ChampionCard
								champions={champions}
								setChamp={setChamp}
								champ={champ}
								imgIndex={imgIndex}
								setImgIndex={setImgIndex} />
						</Box>
					</Grid>
					<Grid item xs={12} sm={9} md={9} lg={9}>
						{champ &&
							<Champ
								champ={champ}
								imgIndex={imgIndex}
								setImgIndex={setImgIndex}
							/>
						}
					</Grid>
				</Grid>
			</Container>
		</section>
	);
}

// export AboutChampion
export default AboutChampion;
