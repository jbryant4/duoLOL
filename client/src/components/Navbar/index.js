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

//import auth 
import Auth from "../../utils/auth"

//Style
const useStyles = makeStyles({
	menuStyle: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textDecoration: "none",
		color: "white",
		backgroundColor: "var(--primaryColor)",
		width: "100%",
	},
	NavbarBottom: {
		marginBottom: "25px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textDecoration: "none",
		color: "white",
		backgroundColor: "var(--primaryColor)",
		width: "100%",
	},
});

// Navbar Function
export default function Navbar() {
	const classes = useStyles();
	//menu items
	const menuList = [
		{
			text: "Home",
			icon: <HomeIcon />,
			destination: "/home",
			logout: false
		},
		{
			text: "About Champions",
			icon: <EmojiEventsIcon />,
			destination: "/AboutChampion",
			logout: false
		},
		{
			text: "Duo Partner Finder",
			icon: <GroupAddIcon />,
			destination: "/DuoFinder",
			logout: false
		},
		{
			text: "Build a Build",
			icon: <BuildIcon />,
			destination: "/BuildABuild",
			logout: false
		},
		{
			text: "Chat",
			icon: <QuestionAnswerOutlinedIcon />,
			destination: "/Chatpage",
			logout: false
		},
		{
			text: "Log Out",
			icon: <ExitToAppIcon />,
			destination: "/",
			logout: true
		},
	];

	function handleButtonClick(logout) {
		console.log(logout)
		if (logout) {
			Auth.logout()
		} else {
			if(!Auth.loggedIn()) {
				window.location.assign("/")
			}
		}
	}

	return (
		<Tabs>
			{menuList.map((item) => {
				const { text, icon, destination, logout } = item;
				return (
					<Link to={destination} className={classes.NavbarBottom}>
						<ListItem button key={text} className={classes.menuStyle} onClick={() => handleButtonClick(logout)}>
							{icon && <ListItemIcon>{icon}</ListItemIcon>}
							<ListItemText primary={text} />
						</ListItem>
					</Link>
				);
			})}
		</Tabs>
	);
}
