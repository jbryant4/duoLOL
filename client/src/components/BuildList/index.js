import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		margin: 5,
		// backgroundColor: "var(--secondaryColor)",
		// color: "var(--primaryColor)"
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	items: {
		display: 'flex',
		flexWrap: 'no-wrap',
		
	}
}));

export default function BuildList({ builds }) {
	const classes = useStyles();
	const [expandedId, setExpandedId] = useState(-1);


	const handleExpandClick = i => {
		setExpandedId(expandedId === i ? -1 : i);
	};


	return (
		<>
			{builds.map((buildString, i) => {

				const build = {
					title: buildString.title,
					champion: JSON.parse(buildString.champion),
					items: [JSON.parse(buildString.boots), JSON.parse(buildString.mythic), ...JSON.parse(buildString.legendaries)]
				}


				return (
					<Card className={classes.root} key={build.title}>
						<CardHeader
							avatar={
								<Avatar aria-label="" className={classes.avatar} src={build.champion.link} />
							}
							title={build.title}
							subheader={build.champion.name}
							action={<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expandedId === i,
								})}
								onClick={() => handleExpandClick(i)}
								aria-expanded={expandedId === i}
								aria-label="show more"
							>
								<ExpandMoreIcon />
							</IconButton>}
						/>


						{/* if we want to add likes to build this is an easy way*/}
						{/* <CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
				<FavoriteIcon />
				</IconButton>
			</CardActions> */}
						<Collapse in={expandedId === i} timeout="auto" unmountOnExit>
							<CardContent className={classes.items}>
								{build.items.map(item => (
									<Avatar aria-label={item.name} src={item.link} />
								))}
							</CardContent>
						</Collapse>
					</Card>
				)
			})}
		</>
	);
}