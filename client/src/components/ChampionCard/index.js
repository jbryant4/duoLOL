import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ImageAvatars from "../ImageAvatars";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "center",
		width: "100px",
		backgroundColor: "rgba(30, 28, 74,1)",
		margin: 2,
		boxShadow: "inset 0 0 10px black",
	},
	bullet: {
		display: "inline-block",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 16,
		maxWidth: "100%",
		margin: 0,
		padding: 0,
		fontWeight: "bold",
		color: "goldenrod",
	},
	pos: {
		marginBottom: 0,
	},
	cardContainer: {
		display: "flex",
		flexWrap: "wrap",
		maxHeight: 600,
		overflow: "scroll",
		scrollbarWidth: "thin",
		scrollbarColor: "blue orange",
		alignItems: "center",
		justifyContent: "center",
		padding: 2,
		border: "1px solid black",
		backgroundColor: "goldenrod",
		borderRadius: "10px",
		boxShadow: "inset 0 0 10px black",
	},
	titleWrap: {
		padding: 0,
	},
});

export default function OutlinedCard({
	champions,
	setChamp,
	champ,
	imgIndex,
	setImgIndex,
}) {
	const classes = useStyles();

	function handleChampChange(e) {
		e.preventDefault();
		console.log("called");
		if (e.target.innerText) {
			setChamp(e.target.innerText);
			setImgIndex(0);
		} else {
			setChamp(e.target.alt);
			setImgIndex(0);
		}
	}
	return (
		<div className={classes.cardContainer}>
			{champions &&
				champions.map((champion) => (
					<Card
						onClick={handleChampChange}
						key={champion.name}
						className={classes.root}
						variant="outlined"
					>
						<CardContent className={classes.titleWrap}>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
							>
								{champion.name}
							</Typography>
						</CardContent>
						<ImageAvatars link={champion.icon.url} name={champion.name} />
					</Card>
				))}
		</div>
	);
}
