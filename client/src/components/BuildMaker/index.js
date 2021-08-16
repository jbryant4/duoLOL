import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


//query
import { useQuery } from "@apollo/client";
import { QUERY_BUILD_ITEMS } from "../../utils/queries";



const useStyles = makeStyles((theme) => ({
    itemBox: {
        height: 250,
        overflow: 'scroll',
        border: 'solid 2px red',
        margin: '10px 5px'
    },
    itemImg: {
        margin: 5,
    }


}));

export default function Build({ }) {
    const classes = useStyles();

    const { loading, data, error } = useQuery(QUERY_BUILD_ITEMS)
    if (loading) {
        return <h1>Loading....</h1>;
    }
    if (error) {
        console.log(error);
    }

    const boots = data?.buildItems.boots;
    const mythics = data?.buildItems.mythics;
    const legendaries = data?.buildItems.legendaries;

    return (
        <div>
            <div className={classes.itemBox}>
                {boots &&
                    boots.map(boot => (
                        <div>
                            <img alt={boot.name} src={boot.icon.url} />
                            <div dangerouslySetInnerHTML={{ __html: boot.description }} className={classes.hidden} />
                        </div>
                    ))
                }
            </div>
            <div className={classes.itemBox}>
                {mythics &&
                    mythics.map(mythic => (
                        <div>
                            <img alt={mythic.name} src={mythic.icon.url} className={classes.itemImg} />
                            <div dangerouslySetInnerHTML={{ __html: mythic.description }} className={classes.hidden} />
                        </div>
                    ))
                }
            </div>
            <div className={classes.itemBox}>
                {legendaries &&
                    legendaries.map(legend => (
                        <div>
                            <img alt={legend.name} src={legend.icon.url} />
                            <div dangerouslySetInnerHTML={{ __html: legend.description }} className={classes.hidden} />
                        </div>
                    ))
                }
            </div>
        </div>
    )

}