import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ExpandMore } from '@styled-icons/material/ExpandMore';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';



//icons not from materialUi
import { HeartFill } from "@styled-icons/bootstrap/HeartFill"
import { Close } from "@styled-icons/material-rounded/Close"

// framer for animating
import { Frame, useMotionValue, useTransform, useAnimation } from 'framer';

import { CicleButton } from "./circle-button";
import PositionedPopper from './popper-button';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    media: {
        height: 0,
        width: 350,
        height: 525,
        backgroundPosition: "unset"
    },
    expandIcon: {
        position: "absolute",
        top: "50%",
        right: 0,
        backgroundColor: 'white'
    },

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        order: -1
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    // new card 
    content: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        // zIndex: 1,
        padding: '1.5rem 1.5rem 1rem',
    },
    title: {
        fontFamily: "'Sen', sans-serif",
        fontSize: '2rem',
        fontWeight: 800,
        color: '#fff',
    },
    main: {
        overflow: 'hidden',
        backgroundColor: 'black',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
        zIndex: 1,
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            display: 'block',
            width: '100%',
            height: '45%',
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.24), rgba(0,0,0,0))',
        },
    },
    actionBarWrapper: {
        placeContent: "space-evenly"
    },
}));

export default function MatchingCard({ }) {


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card className={classes.root} elevation={3}>
            <Box className={classes.main} minHeight={300} position={'relative'}>
                <CardMedia
                    className={classes.media}
                    image="https://images-ext-1.discordapp.net/external/KKjfwJamf75_hTOB0hwApPZoj8mGhxBe_Tm5qpc8IZs/http/ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg"
                // title="Kha Zix"
                />

                <Box className={classes.content}>
                    <Typography variant={'h2'} className={classes.title}>
                        PacSmack
                    </Typography>
                </Box>


                <PositionedPopper />



            </Box>


            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p" className="disable-select">
                    I love to feed playing jungle with my teammates, always aiming to lose before 15min!!!
                </Typography>
            </CardContent>


            <CardActions className={classes.actionBarWrapper}>

                <CicleButton>
                    <Close className="closeBtn" />
                </CicleButton>

                <CicleButton>
                    <HeartFill className="heartBtn" />
                </CicleButton>

            </CardActions>

        </Card >
    );
}