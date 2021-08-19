import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { ApolloClient, gql, useQuery } from '@apollo/client';
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

// tinder card
import TinderCard from 'react-tinder-card'

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

//! what is sent to the card
// let db = [
//     {
//         name: "Nathan",
//         src: "https://static.wikia.nocookie.net/leagueoflegends/images/0/08/Kha%27Zix_DarkStarLoading.jpg/revision/latest/scale-to-width-down/308?cb=20200425004141",
//         bio: "lorem ipsum",
//         mainRoles: [topIcon, adcIcon]
//     }
// ]


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
        placeContent: "space-evenly"
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
        position: 'relative'
    }
}));




const alreadyRemoved = []

export default function MatchingCard({ }) {
    const classes = useStyles();

    // tinder op   
    const [lastDirection, setLastDirection] = useState()
   
    const { loading, data, error } = useQuery(QUERY_USERS);

    const cachedMutatedData = useMemo(() => {
        if (loading || error) return null

        // mutate data here
        return data
    }, [loading, error, data])

    if (loading) <h1>Loading....</h1>
    if (error) console.log(error)

    // safe to assume data now exist and you can use data.
    const mutatedData = (() => {
        // if you want to mutate the data for some reason
        return data
    })()

    const users = data?.users;

    const childRefs = useMemo(() => Array(data.length).fill(0).map(i => React.createRef()), [])

    // if (loading) {
    //     return <h1>Loading....</h1>;
    // }
    // if (error) {
    //     console.log(error);
    // }




    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
        alreadyRemoved.push(nameToDelete)
        console.log(users)
    }

    const outOfFrame = (name) => {

    }


    const swipe = (dir) => {
        console.log("SWIPE", dir)
        const cardsLeft = users.filter(person => !alreadyRemoved.includes(person.name))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
            const index = data?.users.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }






    return (
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




                return (
                    < Box className={classes.tinderCardWrapper} >
                        <TinderCard ref={childRefs[index]} className={classes.swipeCard} key={user.name} preventSwipe={['up', 'down']} onSwipe={(dir) => swiped(dir, user.name)} onCardLeftScreen={() => outOfFrame(user.name)}>
                            <Card className={classes.root} elevation={3}>
                                <Box className={classes.main} minHeight={300} position={'relative'}>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg"

                                    />

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

                                    <CicleButton onClick={() => swipe('left')}>
                                        <Close className="closeBtn" />
                                    </CicleButton>

                                    <CicleButton onClick={() => swipe('right')}>
                                        <HeartFill className="heartBtn" />
                                    </CicleButton>

                                </CardActions>

                            </Card >

                        </TinderCard>
                    </Box>
                )
            })}
            <PositionedPopper className={classes.popperBtnDuoPage} />
        </Box >
    );
}