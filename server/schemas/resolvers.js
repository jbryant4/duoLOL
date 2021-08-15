const { User, Build } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const riotApi = require('../utils/riotApi/riotApi');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // console.log(context.user)
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('builds')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        build: async (parent, { _id }) => {
            return Build.findOne({ _id });
        },
        // get a user by username
        user: async (parent, { email }) => {
            return User.findOne({ email })
                .select('-__v -password')
                .populate('builds')
        },
        champions: async (parent, { patch }) => {
            const champions = await riotApi.getChampions();
            return champions
        },
        champion: async (parent, { name }) => {
            const champion = await riotApi.getChampionByName(name);
            return champion
        },
        mastery: async (parent, { region, riotId }) => {
            const masteries = await riotApi.champMasteryData(region, riotId);
            return masteries
        },
        matches: async (parent, { region, type, puuid }) => {
            const matches = await riotApi.matchHistoryData(region, type, puuid);
            return matches
        }
    },
    Mutation: {
        addUser: async (parent, args ) => {
            console.log(args);
            const user = await User.create(args);

            const lolData = await riotApi.riotDataSignUp(user.sumName, 'na1')
            
            const updatedUser = await User.findByIdAndUpdate(user._id,
                {
                    rank: lolData.rank,
                    tier: lolData.tier,
                    wins: lolData.wins,
                    losses: lolData.losses
                },
                { new: true }
            )

            const token = signToken(updatedUser)
            return { user: updatedUser, token };
        },
        login: async (parent, { email, password }) => {
            // console.log(email , password)
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            //call 
            const lolData = await riotApi.riotDataUpdata(user.riotId, 'na1')

            const updatedUser = await User.findByIdAndUpdate(user._id,
                {
                    rank: lolData.rank,
                    tier: lolData.tier,
                    wins: lolData.wins,
                    losses: lolData.losses
                },
                { new: true }
            )

            const token = signToken(updatedUser)
            return { user: updatedUser, token };
        },
        addBuild: async (parent, { content }, context) => {

            if (context.user) {
                const build = await Build.create({ ...content, username: context.user.sumName });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { builds: build._id } },
                    { new: true }
                );

                return build;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;