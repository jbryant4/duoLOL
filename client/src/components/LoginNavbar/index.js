import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//icons
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import HomeIcon from "@material-ui/icons/Home";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import BuildIcon from "@material-ui/icons/Build";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//Style
const useStyles = makeStyles({
	NavStyle: {
		alignItems: "center",
		marginBottom: "25px",
		display: "flex",
		textDecoration: "none",
		color: "white",
		backgroundColor: "goldenrod",
		width: "100%",
	},
});

// Navbar Function
export default function LoginNavbar() {
	const classes = useStyles();

	return (
		<Tabs className={classes.NavStyle}>
					<ListItemText primary="Welcome to Cupid League of Legends"/>
		</Tabs>
	);
}
