import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { SidebarCollapse } from '@styled-icons/octicons/SidebarCollapse';
import zIndex from '@material-ui/core/styles/zIndex';
import ChampStatsCard from '../champRnkStat';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';




const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
    },
    typography: {
        // padding: theme.spacing(2),
        width: 225,
        margin: 10,
        

    },
    popperBtn: {
        position: "absolute",
        top: "50%",
        right: 0,
        backgroundColor: 'rgba(240, 248, 255, 0.493)',
        fontWeight: 'bold',
        zIndex: '999',
        padding: '8px'
    },
    iconCollapse: {
        color: "white"
        
    },
    champStatsCard: {
        zIndex: -199,
        
    },
    paperContainer: {
        margin: 0,
        paddingTop: 3,
        paddingBottom: 3,
    }
    


}));

export default function PositionedPopper() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const classes = useStyles();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };


    return (
        <Box>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper elevation={3} rounded className={classes.paperContainer} >
                            <Typography className={classes.typography} >

                                <ChampStatsCard className={classes.champStatsCard} />
                                <ChampStatsCard />
                                <ChampStatsCard />

                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>

            <Box className={classes.popperIconContainer}>                

                <Button size='small' className={classes.popperBtn} id="popperBtn" onClick={handleClick('right')}>
                    <AssessmentIcon className={classes.iconCollapse} /> <ArrowForwardIosIcon className={classes.iconCollapse} />

                </Button>
            </Box>
        </Box>

    );
}