require('dotenv').config();
//import packages
const TeemoJS = require('teemojs');
const axios = require('axios');

//riot api key 
 
const key = process.env.RIOT_KEY
//set key for all axios calls 
axios.defaults.headers.common["X-Riot-Token"] = key;
axios.defaults.headers.common["Origin"] = 'localhost:3000';
//set api key for riot api wrapper
let api = TeemoJS(key)

//automatically check the patch version to be passed to the other axios functions 
async function getCurrentPatch() {

    const url = 'http://ddragon.leagueoflegends.com/api/versions.json';
    const { data } = await axios.get(url)
    const currentPatch = data[0]
    return currentPatch;
}
//? (regions: BR1,EUN1,EUW1,JP1,KR,LA1,LA2,NA1,OC1,TR1,RU)()
//gather riot info on sign up
async function riotDataSignUp(sumName, region = 'na1') {
    // will take the puuid and the riot id

    const userData = await api.get(region, 'summoner.getBySummonerName', sumName)
    // console.log(userData);
    const riotId = userData.id;
    const puuid = userData.puuid
    const lolData = await riotDataUpdata(riotId, region)

    return { ...userData, ...lolData, riotId, puuid }
}
//update riot info on login
async function riotDataUpdata(riotId, region = 'na1') {
    //solo que data
    
    const lolData = await api.get(region, 'league.getLeagueEntriesForSummoner', riotId)
    //return first slot in array because that is solo que data
    if (lolData.length === 2) {

        const rankData = lolData.filter(rank => rank.queueType === 'RANKED_SOLO_5x5')
        // console.log(rankData)
        return rankData[0]

    } else if (lolData.length === 1) {
        if (lolData[0].queueType === 'RANKED_SOLO_5x5') {
            return lolData[0]
        } else {
            const unranked = {
                rank: 'unranked',
                tier: 'unranked',
                wins: 'no ranked wins',
                losses: 'no ranked losses'
            }
            
            return unranked
        }
    } else {
        const unranked = {
            rank: 'unranked',
            tier: 'unranked',
            wins: 'no ranked wins',
            losses: 'no ranked losses'
        }
        
        return unranked
    }
}
//!get mastery for all champs for a user 
async function champMasteryData(region = 'na1', riotId) {
    const link=`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${riotId}`
    //return user top 20 champion (most played) 
    const {data} = await axios.get(link)
    
    const userChampionsMastery = data.slice(0,20)
    return userChampionsMastery;
}

//! get all match info for the last 20 matches 
//? (regions: americas asia or europe)(puuid)(ranked or normal)

async function matchHistoryId(region = 'AMERICAS', type = 'ranked', puuid) {
    const link = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=${type}&start=0&count=20`
    const {data} = await axios.get(link)
    console.log(data)
    let matchHistoryData = []

    return data
}

async function matchHistoryData(region = 'AMERICAS', type = 'ranked',) {
    const link = `https://${region}.api.riotgames.com/lol/match/v5/matches/${match}`
    const {data} = await axios.get(link)
    console.log(data)
    let matchHistoryData = []

    return data
}

//Data for champlist component  of current champions
async function getChampions(_patch) {
    let patch = _patch ? _patch : await getCurrentPatch()
    let champList = []

    //grab list of all champs and put in array of object with name and square img 
    const link = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`
    try {
        const data = await axios.get(link)

        for (const [key, value] of Object.entries(data.data.data)) {
            champList.push({
                name: key,
                blurb: value.blurb,
                icon: {
                    url: `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${key}.png`
                }
            })
        }
    }
    catch (err) {
        console.error(err)
    }
    return champList
}

/**
 * gets champion data by name
 * @param {String} champName 
 * @param {String} patch 
 * @returns 
 */
async function getChampionByName(champName, _patch) {
    //check current patch
    let patch = _patch ? _patch : await getCurrentPatch()
    // const patch = await setPatch();


    //link to specific champdata
    const link = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion/${champName}.json`;

    const { data } = await axios.get(link)

    //navigate down into the obj with the data we want 
    const champ = data.data[champName];
    let champInfo = { ...champ }
    //set up out champInfo with the data we want returned

    champInfo.images = [];
    //store all images in obj with titles
    champInfo.skins.map(skin =>
        champInfo.images.push({
            name: skin.name,
            url: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${skin.num}.jpg`
        }));

    champInfo.passive = {
        name: champInfo.passive.name,
        description: champInfo.passive.description,
        icon: {
            url: `http://ddragon.leagueoflegends.com/cdn/${patch}/img/passive/${champInfo.passive.image.full}`
        }
    };

    champInfo.abilities = [];
    //store all skins in obj with titles/img/descriptions
    champInfo.spells.map(spell =>
        champInfo.abilities.push({
            name: spell.name,
            description: spell.description,
            icon: {
                url: `http://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spell.image.full}`
            }
        }));


    return champInfo

}

//get all items 
async function getBuildItems(_patch) {
    let patch = _patch ? _patch : await getCurrentPatch()
    let itemData = []
    let itemsList = {
        boots: [],
        mythics: [],
        legendaries: []
    }
    //we only want items that are map 11: true
    const link = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`

    try {
        const { data } = await axios.get(link)

        for (const [key, value] of Object.entries(data.data)) {

            itemData.push({
                itemNum: key,
                name: value.name,
                description: value.description,
                icon: {
                    url: `http://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${key}.png`
                },
                rifts: value.maps,
                depth: value.depth,
                from: value.from,
                into: value.into,
            })
        }
    }
    catch (err) {
        console.error(err)
    }

    const riftData = itemData.filter(item => item.rifts[11] === true)
    //grab all books 
    riftData.map(item => {
        if (item.from) {
            if (item.from[0] === '1001') {
                itemsList.boots.push(item)
            }
        }
    })
    //grap all mythics
    riftData.map(item => {
        const mythicCheck = item.description.split('Mythic')
        if (mythicCheck.length > 1) {
            itemsList.mythics.push(item)
            //grab all other complete items  
        } else if (
            !item.into
            && item.depth >= 2
            && item.from[0] !== '1001'
            || item.itemNum === '3042'
            || item.itemNum === '3040'
            || item.itemNum === '3860'
            || item.itemNum === '3857'
            || item.itemNum === '3853'
            || item.itemNum === '3864'
            //should 
        ) {
            itemsList.legendaries.push(item)
        }
    })
    // const itemNames = itemsList.legendaries.map(item => item.name)
    // console.log(itemNames.sort())
    // console.log(itemsList.legendaries.length)
    return itemsList
}


module.exports = { getChampions, getChampionByName, riotDataUpdata, getCurrentPatch, riotDataSignUp, matchHistoryData, champMasteryData, getBuildItems }