//import packages
const TeemoJS = require('teemojs');
const axios = require('axios');

//riot api key 
//! will be saved to an .env when we go to production 
const key = 'RGAPI-104c4d2a-edaa-42d5-ad2f-3705a50f388a';
//set key for all axios calls 
axios.defaults.headers.common[ "X-Riot-Token"] = key;
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


//? (regions: BR1,EUN1,EUW1,JP1,KR,LA1,LA2,NA1,OC1,TR1,RU)()
//gather riot info on sign up
async function riotDataSignUp(region, sumName) {

    //Riot LOL ida
    userData.riotId = await api.get(region, 'summoner.getBySummonerName', sumName)
        .then(data => { return data.id });
    //solo que 
    const lolData = await api.get(region, 'league.getLeagueEntriesForSummoner', userData.riotId)
        .then(data => { return data[0] });

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
        .then(data => { return data[0] });

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
        .then(data => { return data.slice(0, 20) });

    //return top 
    console.log(championMastery);
}

// get all match info for the last 20 matches 
//? (regions: americas asia or europe)(puuid)(ranked or normal)
async function matchHistoryIds(region,type, puuid) {
    const link = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=${type}&start=0&count=20`
    const matchIds = await axios.get(link)
        .then( data => {return data.data})
    //map over the ids and send each one to the matchData function
}
async function matchData(region,matchId) {
    const link = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`
    const matchData = await axios.get(link)
        .then(data => {return data.data})
    
        console.log(matchData)
    //alot of data in here we just have to figure out what data we want
}

//!json calls prob with axios

//?champions all
//http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion.json
//?specific champions
//http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion/Aatrox.json
//? so much more
//https://developer.riotgames.com/docs/lol