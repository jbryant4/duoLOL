import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';


const khaTest = { uri: "https://www.pockettactics.com/wp-content/uploads/2021/05/league-of-legends-wild-rift-kha-zix.jpg" }

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        marginLeft: '35%'

    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
        width: 350,
        height: 525
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
        zIndex: 1,
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
}));

export default function MatchingCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <Box className={classes.main} minHeight={300} position={'relative'}>
                <CardMedia
                    className={classes.media}
                    image="https://images-ext-1.discordapp.net/external/KKjfwJamf75_hTOB0hwApPZoj8mGhxBe_Tm5qpc8IZs/http/ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg"
                // title="Kha Zix"
                />

                <div className={classes.content}>
                    <Typography variant={'h2'} className={classes.title}>
                        PacSmack
                    </Typography>
                </div>
            </Box>

            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                    I love to feed playing jungle with my teammates, always aiming to lose before 15min!!!
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit >
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                        minutes.
                    </Typography>

                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card >
    );
}