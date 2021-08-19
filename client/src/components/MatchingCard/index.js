import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';
import { graphql } from 'graphql';

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
import Swipe from './swipe';



//icons not from materialUi
import { HeartFill } from "@styled-icons/bootstrap/HeartFill"
import { Close } from "@styled-icons/material-rounded/Close"


import { CicleButton } from "./circle-button";
import PositionedPopper from './popper-button';


import topIcon from "../../assets/images/RoleIcons/top.png";
import jngIcon from "../../assets/images/RoleIcons/jng.png";
import midIcon from "../../assets/images/RoleIcons/mid.png";
import adcIcon from "../../assets/images/RoleIcons/adc.png";
import supIcon from "../../assets/images/RoleIcons/sup.png";

const roleObj = {
    top: topIcon,
    jng: jngIcon,
    mid: midIcon,
    adc: adcIcon,
    sup: supIcon,
}

const useStyles = makeStyles((theme) => ({
    /*root: {
        maxWidth: 350,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },*/
    media: {
        height: 0,
        width: 350,
        height: 525,
        backgroundPosition: "unset"
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
            // display: 'block',
            width: '100%',
            height: '45%',
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.24), rgba(0,0,0,0))',
        },
    },
    actionBarWrapper: {
        placeContent: "space-evenly",
        textAlign: "center"
    },
    swipeCard: {
        zIndex: '0',
        cursor: "pointer",
    },
    userCardIcon: {
        position: 'absolute',
        top: 1,
        right: 0,
        width: 90,

    },
    userSecondCardIcon: {
        position: 'absolute',
        top: 1,
        right: 90,
        width: 90
    },
    tinderCardWrapper: {
        position: 'absolute'
    },
    // popperBtnDuoPage: {
    //     position: 'absolute',
    //     right: 0
    // }
}));






export default function MatchingCard() {
    const classes = useStyles();    

    const [dir, setDir] = useState()
    // console.log(dir)
    const { loading, data, error } = useQuery(QUERY_USERS);
    if (loading) return <h2>Loading....</h2>
    if (error) { console.log(error) }
    const users = data?.users || []

    console.log(data)

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >

            <Box className={classes.tinderCardContainer}>

                {users.map((userData, index) => {
                    const role1 = userData.primRoles[0]
                    const icon1 = roleObj[role1]
                    const role2 = userData.primRoles[1]
                    const icon2 = roleObj[role2]
                    const user = {
                        name: userData.sumName,
                        src: "Aatrox",
                        bio: userData._id,
                        mainRoles: [icon1, icon2]
                    }
                    console.log(user)


                    return (
                        <div style={{ marginLeft: '-175px', marginTop: '-335.5px', position: 'relative' }}>
                            <Swipe key={user.name} className={classes.tinderCardWrapper} >
                                <Card className={classes.root} elevation={3}>
                                    <Box className={classes.main} minHeight={300} position={'relative'}>
                                        <CardMedia
                                            className={classes.media}
                                            image="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg"

                                        />

                                        <PositionedPopper className={classes.popperBtnDuoPage} />


                                        <Box className={classes.content}>
                                            <Typography variant={'h2'} className={classes.title}>
                                                {user.name}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <img className={classes.userCardIcon} src={user.mainRoles[0]} />
                                        </Box>
                                        <Box>
                                            <img className={classes.userSecondCardIcon} src={user.mainRoles[1]} />
                                        </Box>
                                    </Box>

                                    <CardContent>
                                        <Typography variant="body1" color="textPrimary" component="p" className="disable-select">
                                            {user.bio}
                                        </Typography>
                                    </CardContent>


                                    <CardActions className={classes.actionBarWrapper}>
                                        
                                        <h5> Swipe the card RIGHT to match or LEFT to see another DUO!</h5>

                                        <Swipe dir={dir} />
                                        {/* <CicleButton onClick={() => setDir('left')}>                                          
                                            <Close className="closeBtn" />
                                        </CicleButton>

                                        <CicleButton onClick={() => setDir('right')}>
                                            <HeartFill className="heartBtn" />
                                        </CicleButton> */}

                                    </CardActions>

                                </Card >


                            </Swipe>
                        </div>
                    )
                })}


            </Box >
        </div>

    );
}