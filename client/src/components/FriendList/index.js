import React from "react";

//Material Components
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
export default function FriendList({ name }) {
	// use Material styles
	const classes = useStyles();
	const friendsList = name;
	console.log(friendsList);
	return (
		<Grid>
			<div>
				{friendsList &&
					friendsList.map((friendName) => (
						<div key={friendName} className={classes.friend}>
							{friendName}
							<Button
								className={classes.buttonClass}
								// onClick={() => go to chat)}
							>
								Chat
							</Button>
						</div>
					))}
			</div>
		</Grid>
	);
}
