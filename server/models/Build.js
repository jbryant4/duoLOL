const { Schema, model } = require('mongoose');


const buildSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        champion: {
            type: String,
            required: true
        },
        boots: {
            type: String,
            required: true
        },
        mythic: {
            type: String,
            required: true
        },
        legendaries: {
            type: String,
            require: true
        },
        madeBy: {
            type: String
        }
        //this format for mvp but could also add summoner spells,runes and creator thoughts
    }
);


const Build = model('Build', buildSchema);

module.exports = Build;