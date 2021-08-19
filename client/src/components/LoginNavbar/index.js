import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//Logo
// import Logo from "../../assets/images/Logo.png";

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 2,
	},
	title: {
		backgroundColor: "var(--secondaryColor)",
		boxShadow: "inset 0 0 35px black",
		display: "flex",
		justifyContent: "center",
		fontWeight: "bold",
		color: "var(--primaryColor)",
	},
}));

export default function Header() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.title}>
					<h2>Welcome to Cupid LoL</h2>
				</Toolbar>
			</AppBar>
		</div>
	);
}
