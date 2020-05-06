const logger = require('../utils/LoggerService');
const userModel = require('../entity/UsersModel').UsersModel;
const mongoose = require('mongoose')
exports.getFollower = (ctx, user) => {
    return new Promise((resolve, reject) => {
        let userobj = new userModel(user);
        logger('info', ctx, __filename, 'get followers');

        userModel.find({follows: { $in: [user._id] } })
            .then(follow => {
                resolve(follow)
            })
            .catch(error => {
                logger('error', ctx, __filename, error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({ code: 400, messages: 'Bad Request' })
                }
                reject({ code: 500, messages: 'Internal sever Error' })
            })
    })
}

exports.addFollow = (ctx, user, id) => {
    return new Promise((resolve, reject) => {
        let userobj = new userModel(user);
        logger('info', ctx, __filename, 'Add follows');

        userModel.findById(id)
            .then(user => {
               
                userobj.follows.push(user._id)
                userobj.follows = [...new Set(userobj.follows)];
                userobj.save();
            })
            .then(() => {
                logger('info', ctx, __filename, 'Added follows');
                resolve();
            })
            .catch(error => {
                logger('error', ctx, __filename, error);
                if (error instanceof mongoose.Error) {
                    reject({ code: 400, messages: 'Bad Request' })
                }
                reject({ code: 500, messages: 'Internal sever Error' })
            })
    })
}

exports.rmFollow = (ctx , user, id) => {
    return new Promise((resolve, reject) => {
        let userobj = new userModel(user);
        logger('info', ctx , __filename, 'Removing follows');

        userobj.follows = user.follows.filter(e => !e.equals(id))
        userobj.save()
            .then(() => {
                logger('error', ctx, __filename, 'follow removed');
                resolve()
            })
            .catch(error => {
                logger('error', ctx, __filename, error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({ code: 400, messages: 'Bad Request' })
                }
                reject({ code: 500, messages: 'Internal sever Error' })
            })
    })
}