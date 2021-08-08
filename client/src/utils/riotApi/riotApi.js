
//riot api key 
//! will be saved to an .env when we go to production 
const key = '';

//incoming data 
const region = '';
const sumName = '';

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