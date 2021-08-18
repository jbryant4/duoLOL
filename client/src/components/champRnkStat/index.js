import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box } from "@material-ui/core";
import khaIcon from './khaIconTest.png'
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
        width: "100%"
    },
    colorPrimary: {
        backgroundColor:
            theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
    },
    bar: {
        borderRadius: 5,
        backgroundColor: "#1a90ff"
    }
}))(LinearProgress);

// Inspired by the former Facebook spinners.

const useStyles = makeStyles({
    root: {
        colorPrimary: 'rgb(1, 223, 138)'
    },
    rnkStatsWrap: {
        // flexGrow: 1,
        position: 'relative',
        padding: 2,
        marginTop: 5,
        marginBottom: 5,
    },
    iconFormat: {
        position: 'relative',
        width: '100%',

    },
    champNameStats: {
        bottom: 2,
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Sen', sans-serif",
        fontSize: '1.0rem',
        fontWeight: "bold",
        color: '#fff'
    },
    greenText: {
        color: 'rgb(1, 223, 138)'
    },
    redText: {
        color: 'red'
    },
    yellowText: {
        color: 'gold'
    },
    starIcon: {
        color: 'gold',
        marginBottom: -6,
        width: "1rem"
    },
    kdaText: {
        letterSpacing: 2
    },
    champStatIcon: {
        width: '100%'
    },
    kdaTextWrapper: {
        paddingLeft: 3
    }



});

export default function CustomizedProgressBars() {
    const classes = useStyles();

    return (
        <Box display='flex' className={classes.rnkStatsWrap}>
            <Box className={classes.iconFormat}>
                <img className={classes.champStatIcon} src={khaIcon} ></img>
                <Typography variant={'h2'} className={classes.champNameStats} id="disable-select">
                    Kha'Zix
                </Typography>
            </Box>

            <Box className={classes.kdaTextWrapper}>
                <Box>
                    <Typography align='center' className={classes.kdaText} variant={'h6'} id="disable-select">
                        <span className={classes.greenText}>11.4</span>/
                        <span className={classes.redText}>5.8</span>/
                        <span className={classes.yellowText}>7.5</span>
                    </Typography>
                </Box>



                <Typography align='center' variant={'subtitle2'} id="disable-select">
                    <StarsIcon className={classes.starIcon} /> 72% Win Rate
                </Typography>
                <BorderLinearProgress variant="determinate" value={72} color="secondary" />
            </Box>
        </Box>
    );
}