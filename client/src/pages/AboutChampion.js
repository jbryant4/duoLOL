// React
import React from "react";

// Material UI
import { Container, Box } from "@material-ui/core";

//Components
import SimpleSelect from "../components/SimpleSelect";
import ComponentList from "../components/ComponentList";
import Header from "../components/Header";
import ImageAvatars from "../components/ImageAvatars";

// AboutChampion
function AboutChampion(props) {
	return (
		<section>
			<Container maxWidth="md">
				<Header />
				<h1>Champions</h1>
				<h2>Select a Champion to Learn More</h2>
				<SimpleSelect />
				<ComponentList />
				<Box color="text.primary" clone>
					<h1>Description goes here</h1>
				</Box>
					<ImageAvatars />
			</Container>
		</section>
	);
}

// export AboutChampion
export default AboutChampion;
