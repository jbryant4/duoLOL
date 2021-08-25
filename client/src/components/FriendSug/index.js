import React, { useState, useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useMutation, useQuery } from '@apollo/client';
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

//import component
import SearchBar from '../SearchBar';





import topIcon from "../../assets/images/RoleIcons/top.png";
import jngIcon from "../../assets/images/RoleIcons/jng.png";
import midIcon from "../../assets/images/RoleIcons/mid.png";
import adcIcon from "../../assets/images/RoleIcons/adc.png";
import supIcon from "../../assets/images/RoleIcons/sup.png";
import { ADD_FRIEND } from '../../utils/mutations';

const roleObj = {
    top: topIcon,
    jng: jngIcon,
    mid: midIcon,
    adc: adcIcon,
    sup: supIcon,
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "300px",
        overflow: "unset",
        margin: "10px 0px",
        padding: 3,
        display: "flex",
        flexWrap: "wrap"

    },
    media: {
        height: 150,
        width: "100%",
        margin: 0
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
    roles: {
        height: 50
    },
    innerCard: {
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%"

    },
    roleContainer: {
        display: 'flex',
    },
    container: {
        display: "flex",
        margin: "20px auto"
    },
    searchBars: {
        width: "20%"

    },
    cardContainer: {
        width: "80%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"

    }
}));





export default function FriendSug({ currentFriends, me, }) {
    // style
    const classes = useStyles();
    //mutation and querys 
    const [addFriend] = useMutation(ADD_FRIEND)
    const { loading, data, error } = useQuery(QUERY_USERS);

    // for search bar
    const [roleInput, setRoleInput] = useState('');
    const [rankInput, setRankInput] = useState('');
    const [userListDefault, setUserListDefault] = useState();
    const [userList, setUserList] = useState();

    const setData = async () => {
        if (loading) {
            return <h1>Loading....</h1>;
        }
        if (error) {
            console.log(error);
        }

        const newFriends = data?.users || [];

        setUserListDefault(newFriends)
        setUserList(newFriends)
    }

    const updateRoleInput = async (input) => {
        const filtered = userListDefault.filter(user => {
            const roles = `${user.primRoles[0]}${user.primRoles[1]}`
            return roles.toLowerCase().includes(input.toLowerCase())
            // return user.primRoles.map(role => role.toLowerCase().includes(input.toLowerCase()))
        })
        setRoleInput(input);
        setUserList(filtered);
    }
    const updateRankInput = async (input) => {
        const filtered = userListDefault.filter(user => {
            return user.tier.toLowerCase().includes(input.toLowerCase())
        })
        setRankInput(input);
        setUserList(filtered);
    }

    useEffect(() => { setData() }, []);

    async function handleBtnClick(friendId) {
        try {
            const { data } = await addFriend({
                variables: { friendId: friendId }
            })
        } catch (err) {
            console.error(err)
        }

        //filter 
        const refresh = userList.filter(user => user._id !== friendId)
        setUserList(refresh)
    }

    return (
        <div className={classes.container}>
            <div className={classes.searchBars}>
                <h2>Filter by Rank</h2>
                <SearchBar
                    keyword={rankInput}
                    setKeyword={updateRankInput}
                />
                <h2>Filter by Role</h2>
                <SearchBar
                    keyword={roleInput}
                    setKeyword={updateRoleInput}
                />
            </div>
            <div className={classes.cardContainer}>

                {userList && userList.map(newFriend => {

                    const role1 = newFriend.primRoles[0]
                    const role2 = newFriend.primRoles[1]

                    return (
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg"
                                title="Top Champ"
                            />
                            <CardContent className={classes.innerCard}>
                                <div>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {newFriend.sumName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {newFriend.tier}
                                    </Typography>
                                </div>
                            </CardContent>
                            <div className={classes.innerCard}>
                                <CardActions>
                                    <IconButton aria-label="add to favorites" onClick={() => handleBtnClick(newFriend._id)}>
                                        <AddIcon />
                                    </IconButton>
                                </CardActions>
                                <div className={classes.roleContainer}>
                                    <img src={roleObj[role1]} className={classes.roles} />
                                    <img src={roleObj[role2]} className={classes.roles} />
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}