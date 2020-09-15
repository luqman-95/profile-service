const { Schema, model: Model } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const schema = new Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    nama: {
        type: String,
        required: true,
        index: true
    },
    nomorHp: {
        type: String,
        required: true,
        index: true
    }
});

schema.plugin(mongooseDelete, {deletedAt: true});

module.exports = Model ('profile', schema, 'profile_user');