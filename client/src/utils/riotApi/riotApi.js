//import packages
const TeemoJS = require('teemojs');
const axios = require('axios');

//riot api key 
//! will be saved to an .env when we go to production 
const key = 'RGAPI-4484f33c-a678-4941-98ec-d012e7ee28a7';
//set key for all axios calls 
axios.defaults.headers.common["X-Riot-Token"] = key;

//set api key for riot api wrapper
let api = TeemoJS(key)


//incoming data(test data)
let userData = {
    username: 'jbryant',
    email: 'j@j.com',
    password: 'j1234',
    region: 'na1',
    sumName: 'KingOre0'
}
const userRiotId = 'wj_3dqWL9Nu7yD7lYZQqoIRWfnTiL2lL4HUQZRLzZ7FYmPE'
const userPuuId = 'aCY9__fgp6sfVzmlSpnPqwVLJeD56lySAEyuRihEgzhGB_u-6aYHGmAZfhXdGDmMKO-pVZxdGQ0ibA'


//automatically check the patch version to be passed to the other axios functions 
async function setPatch() {
    const link = 'http://ddragon.leagueoflegends.com/api/versions.json';
    const version = await axios(link)
        .then(data => { return data.data[0] })
        .catch(e => console.log(e));

    return version;
}
//? (regions: BR1,EUN1,EUW1,JP1,KR,LA1,LA2,NA1,OC1,TR1,RU)()
//gather riot info on sign up
async function riotDataSignUp(region, sumName) {

    //Riot LOL ida
    userData.riotId = await api.get(region, 'summoner.getBySummonerName', sumName)
        .then(data => { return data.id })
        .catch(e => console.log(e));
    //solo que 
    const lolData = await api.get(region, 'league.getLeagueEntriesForSummoner', userData.riotId)
        .then(data => { return data[0] })
        .catch(e => console.log(e));

    //
    userData.rank = lolData.tier;
    userData.win = lolData.wins;
    userData.loss = lolData.losses;

    console.log(userData)
}
//update riot info on login
async function riotDataLogin(region) {
    //solo que data
    const lolData = await api.get(region, 'league.getLeagueEntriesForSummoner', userData.riotId)
        .then(data => { return data[0] })
        .catch(e => console.log(e))

    //
    userData.rank = lolData.tier;
    userData.win = lolData.wins;
    userData.loss = lolData.losses;

    console.log(userData)
}
//get mastery for all champs for a user 
async function champMasteryData(region, riotId) {
    //return user top 20 champion (most played) 
    const championMastery = await api.get(region, 'championMastery.getAllChampionMasteries', riotId)
        .then(data => { return data.slice(0, 20) })
        .catch(e => console.log(e))

    //return top 
    console.log(championMastery);
}

// get all match info for the last 20 matches 
//? (regions: americas asia or europe)(puuid)(ranked or normal)
async function matchHistoryIds(region, type, puuid) {
    const link = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=${type}&start=0&count=20`
    const matchIds = await axios.get(link)
        .then(data => { return data.data })
        .catch(e => console.log(e))
    //map over the ids and send each one to the matchData function
}
async function matchData(region, matchId) {
    const link = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`
    const matchData = await axios.get(link)
        .then(data => { return data.data })
        .catch(e => console.log(e))

    console.log(matchData)
    //alot of data in here we just have to figure out what data we want
}

//list of current champions
async function getChampList() {
    //check current patch
    const patch = await setPatch();
    //set array to be filled 
    let champList = []

    //grab list of all champs and put in array of object with name and square img 
    const link = `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`
    await axios.get(link)
        .then(function (data) {
            for (const [key, value] of Object.entries(data.data.data)) {
                champList.push({
                    name: key,
                    img: `http://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${key}.png`
                })
            }
        })
        .catch(e => console.log(e))
        
        // console.log(champList)
        return champList
}

getChampList()
//?champions all
//http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion.json
//?specific champions
//http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion/Aatrox.json
//? so much more
//https://developer.riotgames.com/docs/lol