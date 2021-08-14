import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";

//query
import { QUERY_CHAMPION } from "../../utils/queries"

export default function ChampInfo({ champ }) {
    const [imgIndex, setImgIndex] = useState(0)

    //champion query
    const { loading, data, error } = useQuery(QUERY_CHAMPION, {
        variables: { name: champ }
    });
    if (loading) { return (<h1>Loading....</h1>) }
    if (error) { console.log(error) }

    const champion = data?.champion || []
    console.log(champion)

    //btn handle function
    function handleBtnClick(direction,length) {
        if(direction === 'prev') {
            if(imgIndex === 0) {
                return setImgIndex(length-1)
            }else {
                return setImgIndex(imgIndex-1)
            }
        }else if (direction === 'next') {
            if(imgIndex === length-1) {
                return setImgIndex(0)
            }else {
                return setImgIndex(imgIndex+1)
            }
        }
    }
    return (
        <div>

            <button onClick={() => handleBtnClick('prev',champion.images.length)}>
            PREV
            </button>

            <img alt={champion.name} src={champion.images[imgIndex].url} />
            <button onClick={() => handleBtnClick('next',champion.images.length)}>
            NEXT
            </button>

            <p>{champion.name}:<span>{champion.title}</span></p>
            <p>{champion.tags}</p>
            <p>{champion.lore}</p>

            <div>
                <p>abilities</p>
                <div>

                    <p>{champion.passive.name}</p>
                    <img alt={champion.passive.name} src={champion.passive.icon.url} />

                    {champion.abilities &&
                        champion.abilities.map(spell => {
                            return (
                                <>
                                    <p>{spell.name}</p>
                                    <img alt={spell.name} src={spell.icon.url} />
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <p>Tips</p>
                {champion.allytips &&
                    champion.allytips.map(tip => {
                        return (
                            <p>{tip}</p>
                        )
                    })
                }
                {champion.enemytips &&
                    champion.enemytips.map(tip => {
                        return (
                            <p>{tip}</p>
                        )
                    })
                }
            </div>

        </div>

    );
};

