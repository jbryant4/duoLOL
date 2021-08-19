import React, { useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { IconButton } from '@material-ui/core';


//icons not from materialUi
import AddIcon from '@material-ui/icons/Add';
import SkipNextIcon from '@material-ui/icons/SkipNext';






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
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'green',
    },
}));





export default function FriendSug({ currentFriends, me, }) {
    const classes = useStyles();
    const [user, setUser] = useState({})

    const { loading, data, error } = useQuery(QUERY_USERS);

    useEffect(() => {
        if (loading) return <h2>Loading....</h2>
        if (error) { console.log(error) }
        const users = data?.users || []
        console.log(users)
        const allIds = users.map(user => user._id)
        let idsToFilter = currentFriends.map(friend => friend._id)
        idsToFilter.push(me)

        //filter friends out 
        const newFriendsIds = allIds.filter(
            function (e) {
                return this.indexOf(e) < 0;
            },
            idsToFilter
        );

        let newFriends = []
        newFriendsIds.map(id => {
            const data = users.filter(user => user._id === id)
            newFriends.push(data[0])
        })

        var item = newFriends[Math.floor(Math.random() * newFriends.length)];
        console.log(item)
        setUser(item)

    }, [])

    console.log(user)

    async function handleBtnClick(add, friendId) {
        console.log(add, friendId)
    }



    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
                    title="Top Champ"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.sumName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {user.tier}
                    </Typography>
                    <div>
                        <img src={roleObj[user.primRoles[0]]} className={classes.roles} />
                        <img src={roleObj[user.primRoles[1]]} className={classes.roles} />
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to favorites" onClick={() => handleBtnClick('no', user.name)}>
                    <AddIcon />
                </IconButton>
                <IconButton aria-label="share" onClick={() => handleBtnClick('no', user.name)}>
                    <SkipNextIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}