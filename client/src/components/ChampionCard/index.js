import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Box } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import ImageAvatars from "../ImageAvatars";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "center",
		width: "fit-content",
		backgroundColor: "whitesmoke",
		margin: 2
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 18,
	},
	pos: {
		marginBottom: 0,
	},
	cardContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		maxHeight: 420,
		overflow: 'scroll',
		alignItems: 'center',
		justifyContent: 'center'
	},
	
});

export default function OutlinedCard({ champions, setChamp }) {
	const classes = useStyles();

	function handleChampChange(e) {
		if(e.target.innerText) {
			setChamp(e.target.innerText)
		} else {
			setChamp(e.target.alt)
		}
	}
	return (
		<div className={classes.cardContainer}>
			{champions &&
				champions.map(champion => (
					<Card onClick={handleChampChange} key={champion.name} className={classes.root} variant="outlined">
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									{champion.name}
								</Typography>
							</CardContent>
							<ImageAvatars  link={champion.icon.url} name={champion.name} />
					</Card>
				))}
		</div>
	);
}
