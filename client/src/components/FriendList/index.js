import React, { useState } from "react";

//Material Components
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import FriendSug from "../FriendSug"
const useStyles = makeStyles({
	buttonClass: {
		variant: "outlined",
		width: "10rem",
		color: "white",
		padding: "5px",
		margin: "10px",
		display: "flex",
		justifyContent: "space-around",
	},
	friend: {
		margin: "10px",
		padding: "10px",
		border: "1px solid black",
		borderRadius: "10% 05%",
		backgroundColor: "whitesmoke",
		fontWeight: "bold",
		fontSize: "1rem",
	},
});

// Friend List
export default function FriendList({ friends }) {
	console.log(friends)
	// use Material styles
	const classes = useStyles();
	;
	return (
		<Grid>
			<div>
				{friends  &&
					friends.map(friend => (
						<div key={friend.sumName} className={classes.friend}>
							{friend.sumName}
						</div>
					))}
			</div>
		</Grid>
	);
}
