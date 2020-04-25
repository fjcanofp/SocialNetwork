const logger = require('../utils/LoggerService');
const EventsModel = require('../entity/EventsModel').EventsModel;

exports.findEventByID = function (id) {
    return new Promise((resolve, reject) => {
        logger('info', 'EventModel', 'Looking for Event with id ', id);
        EventsModel.findById(id)
            .then(event => {
                logger('info', 'EventModel', 'No event has been found with id ', id);
                if (!event) {
                    reject({
                        code: 400,
                        message: "Not found"
                    })
                }
                logger('info', 'EventModel', 'Event has been found with id ', id);
                resolve(event);
            })
            .catch(error => {
                logger('info', 'EventModel', 'An error occurred', error);
                reject({
                    code: 500,
                    message: "Internal server error"
                })
            })
    })
};

exports.getAllEvents = function () {
    return new Promise((resolve, reject) => {
        logger('info', 'EventModel', 'Showing a new Event', '');
        EventsModel.find()
            .then(event => {
                logger('info', 'EventModel', 'Events had been retrieved ', '');
                resolve(event);
            })
            .catch(error => {
                logger('info', 'EventModel', 'An error occurred', error);
                reject({
                    code: 500,
                    message: "Internal server error"
                })
            })
    })
};

exports.createNewEvents = function (events) {
    return new Promise((resolve, reject) => {
        if (!events) {
            reject({
                code: 400,
                message: "Bad Request"
            })
        }
        logger('info', 'EventModel', 'Creating a new Event', '');
        new EventsModel(events)
            .save()
            .then(event => {
                logger('info', 'EventModel', 'Events had been created with id ', event._id);
                resolve(event);
            })
            .catch(error => {
                logger('info', 'EventModel', 'An error occurred', error);
                reject({
                    code: 500,
                    message: "Internal server error"
                })
            })
    })
};

exports.modifyEvents = function (events) {

    return new Promise((resolve, reject) => {
        logger('info', 'EventModel', 'Modify a new Event', events,_id);
        if (!events) {
            reject({
                code: 500,
                message: "Internal server error"
            })
        }
        EventsModel.find()
            .then(event => {
                logger('info', 'EventModel', 'Events had been retrived ', '');
                resolve(event);
            })
            .catch(error => {
                logger('info', 'EventModel', 'An error happen', error);
                reject({
                    code: 500,
                    message: "Internal server error"
                })
            })
    })
}

exports.deleteEvents = function (id) {
    return new Promise((resolve, reject) => {
        logger('info', 'EventModel', 'Deleting a Event with id ', id);
        EventsModel.deleteOne({ _id: id })
            .then(() => {
                logger('info', 'EventModel', 'Events had been deleted with id ', event._id);
                resolve();
            })
            .catch(error => {
                logger('info', 'EventModel', 'An error occurred', error);
                reject({
                    code: 500,
                    message: "Internal server error"
                })
            })
    })
};