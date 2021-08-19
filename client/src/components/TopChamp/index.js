import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// import AvatarGroup from "@material-ui/lab/AvatarGroup";

import { fontFamily, fontWeight } from "@material-ui/system";
import { useQuery } from "@apollo/client";
import { QUERY_CHAMPIONS } from "../../utils/queries";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        margin: 10,
        backgroundColor: "var(--tertiaryColor)",
        color: "white",
        boxShadow: "inset 0px 0px 35px black",
        borderRadius: "5%",
        fontWeight: 600,
        textAlign: "center",
    },
    icons: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
        justifyContent: "space-around",
    },
    media: {
        height: 150,
        width: "100%"
    },
    cardInfo: {
        textAlign: "center",
        fontFamily: "arial",
        fontWeight: "bold",
    },
}));

export default function TopChamp({ champsMastery }) {
    const classes = useStyles();

    const { loading, data, error } = useQuery(QUERY_CHAMPIONS)
    if (loading) return <h2>Loading champs ....</h2>
    if (error) { return console.log(error) };


    const champInfo = data?.champions


    const cardData = champsMastery.map(champ => {
        const champData = champInfo.filter(x => x.key === champ.championId)

        return { ...champ, ...champData[0] }
    })




    return (
        <>
            {cardData.map(mastery => (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={mastery.icon.url}
                            title="Match Result"
                            alt="Champion"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {mastery.className}
                            </Typography>
                            <Typography
                                variant="body"
                                color="textSecondary"
                                component="h3"
                                className={classes.cardInfo}
                            >
                                Mastery Lvl {mastery.championLevel}: 
                            </Typography>
                            <Typography variant="body" color="textSecondary" component="h3">
                                {mastery.championPoints}
                            </Typography>
                            <div className={classes.icons}>

                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </>
    );
}
