import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// import AvatarGroup from "@material-ui/lab/AvatarGroup";

import sampleImage from "./sample.png";
import iconSample from "./iconSample.png";
import { fontFamily, fontWeight } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 500,
		margin: 10,
	},
	icons: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
		justifyContent: "space-around",
	},
	media: {
		height: 140,
		width: 500,
	},
	cardInfo: {
		textAlign: "center",
		fontFamily: "arial",
		fontWeight: "bold",
	},
}));

export default function MatchComponent() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={sampleImage}
					title="Match Result"
					alt="Champion"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Champion Name: <span>Champ!</span>
					</Typography>
					<Typography
						variant="body"
						color="textSecondary"
						component="h3"
						className={classes.cardInfo}
					>
						Win or Loss?
					</Typography>
					<Typography variant="body" color="textSecondary" component="h3">
						Build Type:
					</Typography>
					<div className={classes.icons}>
						<Avatar alt="Remy Sharp" src={iconSample} />
						<Avatar alt="Travis Howard" src={iconSample} />
						<Avatar alt="Cindy Baker" src={iconSample} />
						<Avatar alt="Remy Sharp" src={iconSample} />
						<Avatar alt="Travis Howard" src={iconSample} />
						<Avatar alt="Cindy Baker" src={iconSample} />
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
