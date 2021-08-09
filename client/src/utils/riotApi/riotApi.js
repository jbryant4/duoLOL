//import packages
const TeemoJS = require('teemojs');
const axios = require('axios');

//riot api key 
//! will be saved to an .env when we go to production 
const key = 'RGAPI-104c4d2a-edaa-42d5-ad2f-3705a50f388a';
//incoming data(test data)
let userData = {
    username: 'jbryant',
    email: 'j@j.com',
    password: 'j1234',
    region: 'na1',
    sumName: 'KingOre0'
}

//set api key
let api = TeemoJS(key)

async function riotDataSignUp(region, sumName) {

    //Riot LOL ida
    userData.riotId = await api.get(region, 'summoner.getBySummonerName', sumName)
        .then(data => { return data.id });
    //solo que 
    const lolData =  await api.get(region, 'league.getLeagueEntriesForSummoner', userData.riotId)
        .then(data => { return data[0] });

    //
    userData.rank = lolData.tier;
    userData.win = lolData.wins;
    userData.loss = lolData.losses;

    console.log(userData)
}
riotData(userData.region, userData.sumName);


//! api calls made from riot endpoints using teemojs
//first api call will be from summoner.getBySummonerName(sumName,region)
//api calls that can be made
//? all user champion mastery or specific champion mastery for a user

//? get list of match ids requires the users puuid also needs region(Americas,Asia,Europe)
//? get match data from match id
//? league data by summonerid

//!json calls prob with axios

//?champions all
//http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion.json
//?specific champions
//http://ddragon.leagueoflegends.com/cdn/11.15.1/data/en_US/champion/Aatrox.json
//? so much more
//https://developer.riotgames.com/docs/lol