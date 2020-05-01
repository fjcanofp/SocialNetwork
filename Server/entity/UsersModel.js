const mongoose = require("mongoose");

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
    avatar : String,
    recoveryID : String
});

exports.UsersModel = mongoose.model(process.env.DB_USER_COLLECTION, schemaUsers);