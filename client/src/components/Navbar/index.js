import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

//icons
import HomeIcon from "@material-ui/icons/Home";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BuildIcon from "@material-ui/icons/Build";

//Style
const useStyles = makeStyles({
	menuStyle: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textDecoration: "none",
		color: "white",
		backgroundColor: "goldenrod",
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
			destination: "/homepage",
		},
		{
			text: "About Champion",
			icon: <EmojiEventsIcon />,
			destination: "/AboutChampion",
		},
		{
			text: "Build a Build",
			icon: <BuildIcon />,
			destination: "/BuildABuild",
		},
		{
			text: "Duo Finder",
			icon: <GroupAddIcon />,
			destination: "/DuoFinder",
		},
		{
			text: "Login or SignUp",
			icon: <AccountCircleIcon />,
			destination: "/",
		},
	];
	return (
		<Tabs>
			{menuList.map((item) => {
				const { text, icon, destination } = item;
				return (
					<Link to={destination} className={classes.menuStyle}>
						<ListItem button key={text} className={classes.menuStyle}>
							{icon && <ListItemIcon>{icon}</ListItemIcon>}
							<ListItemText primary={text} />
						</ListItem>
					</Link>
				);
			})}
		</Tabs>
	);
}
