import React, { useState, useMemo } from 'react';
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

// tinder card
import TinderCard from 'react-tinder-card'

//icons not from materialUi
import { HeartFill } from "@styled-icons/bootstrap/HeartFill"
import { Close } from "@styled-icons/material-rounded/Close"

// framer for animating
import { Frame, useMotionValue, useTransform, useAnimation } from 'framer';

import { CicleButton } from "./circle-button";
import PositionedPopper from './popper-button';


import topIcon from "../../assets/images/RoleIcons/top.png";
import jngIcon from "../../assets/images/RoleIcons/jng.png";
import midIcon from "../../assets/images/RoleIcons/mid.png";
import adcIcon from "../../assets/images/RoleIcons/adc.png";
import supIcon from "../../assets/images/RoleIcons/sup.png";
import zIndex from '@material-ui/core/styles/zIndex';



const db = [
    {
        name: "Nathan",
        src: "https://static.wikia.nocookie.net/leagueoflegends/images/0/08/Kha%27Zix_DarkStarLoading.jpg/revision/latest/scale-to-width-down/308?cb=20200425004141",
        bio: "lorem ipsum",
        mainRoles: [topIcon, adcIcon]
    },
    {
        name: "Vini",
        src: "https://static.wikia.nocookie.net/leagueoflegends/images/5/58/Kassadin_CountLoading.jpg/revision/latest/scale-to-width-down/308?cb=20210517021740",
        bio: "lorem ipsum dasjiudsainjd asuhjdnasuidnasuidyasbhdui",
        mainRoles: [supIcon, jngIcon]
    },
    {
        name: "Robert",
        src: "https://static.wikia.nocookie.net/leagueoflegends/images/2/22/Gangplank_SultanLoading.jpg/revision/latest/scale-to-width-down/308?cb=20200424225909",
        bio: "lorem ipsum testando",
        mainRoles: [topIcon, midIcon]
    },
    {
        name: "Cody",
        src: "https://static.wikia.nocookie.net/leagueoflegends/images/5/59/Lux_CommandoLoading.jpg/revision/latest/scale-to-width-down/308?cb=20200425012143",
        bio: "lorem ipsum testando",
        mainRoles: [jngIcon, supIcon]
    },
    {
        name: "Joseph",
        src: "https://static.wikia.nocookie.net/leagueoflegends/images/7/7f/Graves_CrimeCityLoading.jpg/revision/latest/scale-to-width-down/308?cb=20210810191431",
        bio: "I love to feed playing jungle with my teammates, always aiming to lose before 15min!!!",
        mainRoles: [adcIcon, supIcon],
    }
]


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
    swipeCard: {
        zIndex: '999',
        cursor: "pointer",
    },
    userCardIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 90,

    },
    userSecondCardIcon: {
        position: 'absolute',
        bottom: 0,
        right: 90,
        width: 90
    }
}));

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

export default function MatchingCard({ }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    // tinder op
    const [characters, setCharacters] = useState(db)
    const [lastDirection, setLastDirection] = useState()

    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
        alreadyRemoved.push(nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        charactersState = charactersState.filter(character => character.name !== name)
        setCharacters(charactersState)
    }

    const swipe = (dir) => {
        const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
            const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    return (
        <Box>
            {characters.map((character, index) =>
                <TinderCard ref={childRefs[index]} className={classes.swipeCard} key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                    <Card className={classes.root} elevation={3}>
                        <Box className={classes.main} minHeight={300} position={'relative'}>
                            <CardMedia
                                className={classes.media}
                                image="https://images-ext-1.discordapp.net/external/KKjfwJamf75_hTOB0hwApPZoj8mGhxBe_Tm5qpc8IZs/http/ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg"
                            // title="Kha Zix"
                            />

                            <Box className={classes.content}>
                                <Typography variant={'h2'} className={classes.title}>
                                    {character.name}
                                </Typography>
                            </Box>

                            <Box>
                                <img className={classes.userCardIcon} src={character.mainRoles[0]} />
                            </Box>
                            <Box>
                                <img className={classes.userSecondCardIcon} src={character.mainRoles[1]} />
                            </Box>

                            <PositionedPopper />


                        </Box>


                        <CardContent>
                            <Typography variant="body1" color="textPrimary" component="p" className="disable-select">
                                {character.bio}
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
            )}
        </Box >
    );
}