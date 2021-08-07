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
            required: true,
        },
        mythic: {
            type: String,
            required: true,
        },
        item3: {
            type: String,
            required: true,
        },
        item4: {
            type: String,
            required: true,
        },
        item5: {
            type: String,
            required: true,
        },
        item6: {
            type: String,
            required: true,
        }
        //this format for mvp but could also add summoner spells,runes and creator thoughts
    }
);


const Build = model('Build', buildSchema);

module.exports = Build;