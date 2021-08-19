import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import ImageAvatars from "../ImageAvatars";

//import Data
import { useQuery } from "@apollo/client";
import { QUERY_CHAMPIONS } from "../../utils/queries";


const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "center",
		backgroundColor: "var(--primaryColor)",
		margin: 2,
		boxShadow: "inset 0 0 10px black",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 15,
		maxWidth: "100%",
		margin: 0,
		padding: 0,
		fontWeight: "bold",
	},
	pos: {
		marginBottom: 0,
	},
	cardContainer: {
		display: "flex",
		flexWrap: "wrap",
		maxHeight: "300px",
		overflow: "scroll",
		alignItems: "center",
		justifyContent: "center",
	},
	titleWrap: {
		padding: 0,
	},
});

export default function BuildChamp({ champ, setChamp, content, setContent }) {
    const classes = useStyles();

    //champion query
    const { loading, data, error } = useQuery(QUERY_CHAMPIONS);
    if (loading) {
        return <h1>Loading....</h1>;
    }
    if (error) {
        console.log(error);
    }

    const champions = data?.champions


    function handleChampChange(e) {
        e.preventDefault();

        setChamp({ link: e.target.src, name: e.target.alt })
        setContent('no')
    }

    return (
        <div className={classes.cardContainer}>
            {champions &&
                champions.map(champion => (
                    <Card onClick={handleChampChange} key={champion.name} className={classes.root} variant="outlined">

                        <ImageAvatars link={champion.icon.url} name={champion.name} />
                    </Card>
                ))}
        </div>
    );
}
