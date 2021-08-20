//import gql
const { gql } = require('apollo-server-express');

//create typeDefs
const typeDefs = gql`
    type User {
        _id: ID 
        email: String
        password: String
        rank: String
        tier: String
        wins: String
        losses: String
        sumName: String
        primRoles: [String]
        riotId: String
        puuid: String
        friendCount: Int
        builds:[Build]
        friends: [User]
        masteries: [Masteries]
    }

    type Masteries {
    championId: Int
    championLevel: Int
    championPoints: Int
    }

    type Build {
        _id: ID
        title: String
        champion: String
        boots: String
        mythic: String
        legendaries: String
        madeBy: String
        madeId: String
    }
    type ChampionSummary {
        name: String
        icon: Image
        key: Int
    }
    type Image {
        name: String
        url: String
    }
    type Spell {
        name: String
        description: String
        icon: Image
    }
    type Passive {
        name: String
        description: String
        icon: Image
    }
    type Champion {
        name: String!
        title: String
        images:[Image]
        lore: String
        tags: [String]
        abilities: [Spell]
        passive: Passive
        allytips: [String]
        enemytips: [String]
    }
    type Match {
        id: String
        players:[Champion]
    }
    type Query {
        me: User
        users: [User]
        user(_id:ID!): User
        build(_id: ID!): Build
        champions(patch: String): [ChampionSummary]
        champion(name: String!): Champion
        mastery(region: String!, riotId: String! ): [ChampionSummary]
        matches(region: String!,type: String!, puuid: String!): [Match]
        buildItems(patch: String):AllItems
    }
    type AllItems {
        boots:[Item]
        mythics:[Item]
        legendaries:[Item]
    }

    type Item {
        itemNum: String
        name: String
        description: String
        icon: Image
        rifts: String
        depth: Int
        from: [String]
        into: [String]
        
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!,sumName:String!, primRoles:[String]): Auth
        addBuild(content: buildInfo!): Build
        addFriend(friendId: String!): User
    }

    input buildInfo {
        title: String
        champion: String
        boots: String
        mythic: String
        legendaries: String
    }

    type Auth {
        token: ID!
        user: User
    }

`;

module.exports = typeDefs;

