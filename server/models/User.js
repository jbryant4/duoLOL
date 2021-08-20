const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const riotApi = require('../utils/riotApi/riotApi')

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        wins: {
            type: String,
        },
        losses: {
            type: String,
        },
        // require roles later
        primRoles: {
            type: [String],
        },
        riotId: {
            type: String,
        },
        puuid: {
            type: String
        },
        rank: {
            type: String,
        },
        tier: {
            type: String,
        },
        sumName: {
            type: String,
            required: true,
        },
        builds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Build'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    const data = await riotApi.riotDataSignUp(this.sumName);
    this.puuid = data.puuid;
    this.riotId = data.riotId;
    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;