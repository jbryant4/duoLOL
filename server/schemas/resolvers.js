const { User, Build } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            // console.log(args);
            const user = await User.create(args.content);
            const token = signToken(user);

            return { user, token }
        },
        login: async (parent, {email, password}) => {
            // console.log(email , password)
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user)
            return { user, token };
        },
        addBuild: async (parent, {content}, context) => {
            
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