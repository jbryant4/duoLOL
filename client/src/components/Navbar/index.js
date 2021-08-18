import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//icons
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import HomeIcon from "@material-ui/icons/Home";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import BuildIcon from "@material-ui/icons/Build";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		"aria-controls": `scrollable-force-tabpanel-${index}`,
	};
}

//Style
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
	menuStyle: {
		
		justifyContent: "center",
		backgroundColor: "goldenrod",
		width: "100%",
		marginBottom: "25px",
	},
	linkStyle: {
		textDecoration: "none",
	},
}));

// Navbar Function
export default function Navbar() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default" className={classes.menuStyle}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons="on"
					indicatorColor="primary"
					textColor="primary"
					aria-label="scrollable force tabs example"
				>
					<Link to="/home" className={classes.linkStyle}>
						<Tab label="Home" icon={<HomeIcon />} {...a11yProps(0)}></Tab>
					</Link>

					<Link to="/AboutChampion" className={classes.linkStyle}>
						<Tab
							label="About Champion"
							icon={<EmojiEventsIcon />}
							{...a11yProps(1)}
						/>
					</Link>

					<Link to="/BuildABuild" className={classes.linkStyle}>
						<Tab label="Build a Build" icon={<BuildIcon />} {...a11yProps(2)} />
					</Link>

					<Link to="/DuoFinder" className={classes.linkStyle}>
						<Tab label="Duo Finder" icon={<GroupAddIcon />} {...a11yProps(3)} />
					</Link>

					<Link to="/ChatPage" className={classes.linkStyle}>
						<Tab
							label="Chat"
							icon={<QuestionAnswerOutlinedIcon />}
							{...a11yProps(4)}
						/>
					</Link>

					<Link to="/" className={classes.linkStyle}>
						<Tab label="Log Out" icon={<ExitToAppIcon />} {...a11yProps(6)} />
					</Link>

				</Tabs>
			</AppBar>
		</div>
	);
}
