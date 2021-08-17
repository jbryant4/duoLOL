import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//styles
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ImageAvatars from "../ImageAvatars";
import BuildChamp from "../BuildChamp"
import BuildItem from "../BuildItem"
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { CardActions, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { ADD_BUILD } from '../../utils/mutations';



const useStyles = makeStyles((theme) => ({
    itemBox: {
        height: 250,
        overflow: 'scroll',
        border: 'solid 2px red',
        margin: '10px 5px'
    },
    itemImg: {
        margin: 5,
    },
    media: {
        height: 140,
    },
    innerFlex: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center'
    }


}));

export default function Build({ }) {
    const classes = useStyles();
    const [addBuild, { error }] = useMutation(ADD_BUILD)
    //state for champ
    const [title, setTitle] = useState("test")
    //state for champ
    const [champ, setChamp] = useState({ link: "test", name: '+' })
    //state for boot
    const [boot, setBoot] = useState({ link: "test", name: '+' })
    //state for Mythic
    const [mythic, setMythic] = useState({ link: "test", name: '+' })
    //state for legendaries
    const [legendaries, setLegendaries] = useState([])

    const [content, setContent] = useState('no')
    // console.log(content);

    const handleTitleChange = (event) => {
        const { value } = event.target;
        setTitle(value)
    };

    const handleBuildSubmit = async (event) => {
        event.preventDefault();

        //make sure that everyone state has what it needs in it 
        if (title === 'title' || champ.name === 'test' || boot.name === 'test' || mythic.name === 'test' || legendaries.length != 4) {
            console.log('please fill out build')
            return
        }

        const buildInfo = {
            title: title,
            champion: JSON.stringify(champ),
            boots: JSON.stringify(boot),
            mythic: JSON.stringify(mythic),
            legendaries: JSON.stringify(legendaries)
        }

        try {
            await addBuild({
                variables: { content: buildInfo }
            })

        } catch (e) {
            console.log(e);
        }
        console.log('passed')
        // setFormState({
        //     email: '', password: ''
        // });
    };

    return (
        <div className={classes.container}>
            <Grid>
                <form onSubmit={handleBuildSubmit}>

                    <Card className={classes.root} >
                        <CardContent>
                            <Grid className={classes.innerFlex}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Build Name:
                                </Typography>
                                <TextField onChange={handleTitleChange} />
                            </Grid>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Champion
                            </Typography>
                            <Grid className={classes.innerFlex} onClick={() => setContent('champion')}>
                                <ImageAvatars link={champ.link} name={champ.name} />
                                <Typography gutterBottom variant="h5" component="h2">
                                    {champ.name}
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Items
                                </Typography>
                                <Grid className={classes.innerFlex} >
                                    <div item='boot' onClick={() => setContent('boots')}>
                                        <p>Boots</p>
                                        <ImageAvatars link={boot.link} name={boot.name} />
                                    </div>
                                    <div item='mythic' onClick={() => setContent('mythic')}>
                                        <p>Mythic</p>
                                        <ImageAvatars link={mythic.link} name={mythic.name} />
                                    </div>
                                    <div item='legendary' onClick={() => setContent('legendary')}>
                                        <p>Legendaries</p>
                                        <div className={classes.innerFlex}>
                                            <ImageAvatars link={legendaries[0]?.link} name={legendaries[0]?.name} />
                                            <ImageAvatars link={legendaries[1]?.link} name={legendaries[1]?.name} />
                                            <ImageAvatars link={legendaries[2]?.link} name={legendaries[2]?.name} />
                                            <ImageAvatars link={legendaries[3]?.link} name={legendaries[3]?.name} />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Button size="small" color="primary" type="submit" >
                            Create Build
                        </Button>
                    </Card>
                </form>
            </Grid>
            {content === 'champion' && (
                <BuildChamp
                    setChamp={setChamp}
                    content={content}
                    setContent={setContent}
                />
            )}
            {content === 'boots' && (
                <BuildItem
                    setBoot={setBoot}
                    setContent={setContent}
                    dataItem='boots'
                />
            )}
            {content === 'mythic' && (
                <BuildItem
                    setMythic={setMythic}
                    setContent={setContent}
                    dataItem='mythics'
                />
            )}
            {content === 'legendary' && (
                <BuildItem
                    legendaries={legendaries}
                    setLegendaries={setLegendaries}
                    setContent={setContent}
                    dataItem='legendary'
                />
            )}
        </div>

    )

}