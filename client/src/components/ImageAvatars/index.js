import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import karthusIcon from "../../assets/images/karthus.png";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
}));

export default function ImageAvatars() {
	const classes = useStyles();
	const test = "Test Text";

	return (
		<div className={classes.root}>
			<Avatar alt="Remy Sharp" src={karthusIcon} className={classes.large} />
		</div>
	);
}
