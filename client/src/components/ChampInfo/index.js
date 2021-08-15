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

		width: "100%",
		margin: "0px -100px"

	},
	buttonClass: {
		backgroundColor: "goldenrod",
		variant: "outlined",
		color: "primary",
	},
	imgDiv: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'no-wrap',
		marginTop: 5

	},
	infoDiv: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		width: "41.7rem",

	},
	infoTitle: {
		width: "50%"
	},
	infoP: {
		width: "50%",
		textAlign: 'end'
	},
	innerFlex: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: 0,
		justifyContent: 'space-evenly'
	},
	tipDiv: {
		display: 'flex',
		alignItems: 'flex-start',
		margin: 0,
		justifyContent: 'space-evenly'
	},
	tipDivInner: {
		width: "45%",
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: 0,
		justifyContent: 'space-evenly'
	}
}));

export default function ChampInfo({ champ, imgIndex, setImgIndex }) {
	// use Material styles
	const classes = useStyles();

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

	function handleNullImage() {
		console.log('null image')
		return setImgIndex(0)
	}

	return (
		<div className={classes.root}>
			<Grid container alignContent="center">

				<Grid container spacing={2} className={classes.imgDiv} >
					<Button
						className={classes.buttonClass}
						onClick={() => handleBtnClick("prev", champion.images.length)}
					>
						PREV
					</Button>
					<img
						className={classes.imageStyle}
						alt={champion.name}
						src={champion.images[imgIndex].url}
					/>
					<Button
						className={classes.buttonClass}
						onClick={() => handleBtnClick("next", champion.images.length)}
					>
						NEXT
					</Button>
				</Grid>

				<Grid container spacing={1} className={classes.infoDiv}>
					<h2 className={classes.infoTitle}>
						{champion.name}:<span>{champion.title}</span>
					</h2>
					<p className={classes.infoP}>{champion.tags[0]}   {champion.tags[1] && champion.tags[1]}</p>
					<p>{champion.lore}</p>
				</Grid>

				<Grid>
					<div>
						<h3>Champion Abilities</h3>
						<Grid container className={classes.infoDiv}>
							<div className={classes.innerFlex}>
								<h4>{champion.passive.name}</h4>
								<img alt={champion.passive.name} src={champion.passive.icon.url} />
							</div>
							{champion.abilities &&
								champion.abilities.map((spell) => {
									return (
										<div className={classes.innerFlex}>
											<h4>{spell.name}</h4>
											<img alt={spell.name} src={spell.icon.url} />
										</div>
									);
								})}
						</Grid>
					</div>
					<div>
						<h3>Tips</h3>
						<Grid container className={classes.tipDiv}>
							<div className={classes.tipDivInner}>
								<h4>For Allies</h4>
								{champion.allytips &&
									champion.allytips.map((tip) => {
										return <p>{tip}</p>;
									})}
							</div>
							<div className={classes.tipDivInner}>
								<h4>For Enemies</h4>
								{champion.enemytips &&
									champion.enemytips.map((tip) => {
										return <p>{tip}</p>;
									})}
							</div>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
