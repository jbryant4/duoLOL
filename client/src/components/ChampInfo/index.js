import React, { useState, useEffect } from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//query
import { useQuery } from "@apollo/client";
import { QUERY_CHAMPION } from "../../utils/queries";

// Styles
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	imageStyle: {
		height: "30rem",
		width: "47rem",
	},
	buttonClass: {
		backgroundColor: "goldenrod",
		variant: "outlined",
		color: "primary",
	},
}));

export default function ChampInfo({ champ }) {
	// use Material styles
	const classes = useStyles();

	const [imgIndex, setImgIndex] = useState(0);

	//champion query
	const { loading, data, error } = useQuery(QUERY_CHAMPION, {
		variables: { name: champ },
	});
	if (loading) {
		return <h1>Loading....</h1>;
	}
	if (error) {
		console.log(error);
	}

	const champion = data?.champion || [];
	console.log(champion);

	//btn handle function
	function handleBtnClick(direction, length) {
		if (direction === "prev") {
			if (imgIndex === 0) {
				return setImgIndex(length - 1);
			} else {
				return setImgIndex(imgIndex - 1);
			}
		} else if (direction === "next") {
			if (imgIndex === length - 1) {
				return setImgIndex(0);
			} else {
				return setImgIndex(imgIndex + 1);
			}
		}
	}
	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={2}
				justifyContent="space-between"
				alignItems="center"
			>
				<Grid item xs={1}>
					<Button
						className={classes.buttonClass}
						onClick={() => handleBtnClick("prev", champion.images.length)}
					>
						PREV
					</Button>
				</Grid>
				<Grid item xs={10}>
					<img
						className={classes.imageStyle}
						alt={champion.name}
						src={champion.images[imgIndex].url}
					/>
				</Grid>
				<Grid item xs={1}>
					<Button
						className={classes.buttonClass}
						onClick={() => handleBtnClick("next", champion.images.length)}
					>
						NEXT
					</Button>
				</Grid>
			</Grid>
			<Grid container spacing={1} alignItems="center">
				<h2>
					{champion.name}:<span>{champion.title}</span>
				</h2>
				<h3>{champion.tags}</h3>
				<p>{champion.lore}</p>

				<div>
					<h3>Champion Abilities</h3>
					<div>
						<h4>{champion.passive.name}</h4>
						<img alt={champion.passive.name} src={champion.passive.icon.url} />

						{champion.abilities &&
							champion.abilities.map((spell) => {
								return (
									<>
										<p>{spell.name}</p>
										<img alt={spell.name} src={spell.icon.url} />
									</>
								);
							})}
					</div>
				</div>
				<div>
					<h3>Tips</h3>
					{champion.allytips &&
						champion.allytips.map((tip) => {
							return <p>{tip}</p>;
						})}
					{champion.enemytips &&
						champion.enemytips.map((tip) => {
							return <p>{tip}</p>;
						})}
				</div>
			</Grid>
		</div>
	);
}
