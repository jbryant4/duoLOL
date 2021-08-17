import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import ImageAvatars from "../ImageAvatars";

//import Data 
import { useQuery } from "@apollo/client";
import { QUERY_BUILD_ITEMS } from "../../utils/queries";


const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100px",
        backgroundColor: "whitesmoke",
        margin: 2
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
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 0,
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        maxHeight: 870,
        overflow: 'scroll',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleWrap: {
        padding: 0
    }

});

export default function BuildItem({ setBoot, setMythic, legendaries, setLegendaries, setContent, dataItem }) {
    const classes = useStyles();

    //champion query
    const { loading, data, error } = useQuery(QUERY_BUILD_ITEMS);
    if (loading) {
        return <h1>Loading....</h1>;
    }
    if (error) {
        console.log(error);
    }


    //sort data from query bases on box clicked
    let items = []
    if (dataItem === 'boots') {
        items = data?.buildItems.boots
    } else if (dataItem === 'mythics') {
        items = data?.buildItems.mythics
    } else if (dataItem === 'legendary') {
        items = data?.buildItems.legendaries
    }


    function handleItemChange(e) {
        e.preventDefault();

        if (dataItem === 'boots') {
            setBoot({ link: e.target.src, name: e.target.alt })
            setContent('no')
        } else if (dataItem === 'mythics') {
            setMythic({ link: e.target.src, name: e.target.alt })
            setContent('no')
        } else if (dataItem === 'legendary') {
            const legends = [...legendaries]
            if (legends.length === 4) {
                legends.shift()
                legends.push({ link: e.target.src, name: e.target.alt })
                setContent('no')
                setLegendaries(legends)
            } else if (legends.length === 3) {
                legends.push({ link: e.target.src, name: e.target.alt })
                setContent('no')
                setLegendaries(legends)
            } else {
                legends.push({ link: e.target.src, name: e.target.alt })
                setLegendaries(legends)
            }
        }
    }

    return (
        <div className={classes.cardContainer}>
            {items &&
                items.map(item => (
                    <Card onClick={handleItemChange} key={item.name} className={classes.root} variant="outlined">
                        <ImageAvatars link={item.icon.url} name={item.name} />
                    </Card>
                ))}
        </div>
    );
}
