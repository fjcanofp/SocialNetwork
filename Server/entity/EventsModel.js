const mongoose = require("mongoose");

const eventsModel = mongoose.Schema({
    //_id : ObjectId
    //users: usersModel,
    title: String,
    date: Date,
    place: {
        type: [Number]
    }
});

exports.EventsModel = mongoose.model( process.env.DB_EVENTS_COLLECTION , eventsModel);