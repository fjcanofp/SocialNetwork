const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const schemaUsers = mongoose.Schema({
    //_id : ObjectId
    login: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: String,
    avatar :{
        type: Schema.Types.ObjectId,
        ref: 'GFS',
    },
    stadistics : {
        type: Schema.Types.Mixed,
    },
    follows : [{
        type: Schema.Types.ObjectId,
        ref: process.env.DB_USER_COLLECTION
    }],
    recoveryID : String
});

exports.UsersModel = mongoose.model(process.env.DB_USER_COLLECTION, schemaUsers);