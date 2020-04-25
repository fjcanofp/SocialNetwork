const userModel = require('../entity/UsersModel').UsersModel;
const logger = require('../utils/LoggerService');
const mongoose = require('mongoose');
/**
 * Looking for a user from login and password
 * @param ctx
 * @param { String } login
 * @param { String } password
 */
exports.searchUser = function (ctx, login, password) {
    logger('info', 'UserModel', ctx, 'Looking for Authenticate');
    return new Promise(function (resolve, reject) {
        userModel.findOne({login: login, password: password})
            .then(user => {
                if (!user) {
                    logger('warn', ctx, '400', 'User not found');
                    reject({code: 400, messages: 'Not found'});
                    return
                }
                resolve(user)
            })
            .catch(error => {
                logger('error', ctx, 'Looking for User', error.message);
                if (error.split(':')[0] === 'ValidationError') {
                    reject({code: 500, messages: 'Internal sever Error'})
                }
                reject({code: 500, messages: 'Internal sever Error'})
            })

    })
};

/**
 * @param ctx
 * @param user
 */
exports.signUpUser = function (ctx, user) {
    logger('debug', 'UserModel', ctx, 'Creating a new User');
    return new Promise((resolve, reject) => {
        delete user._id;
        user = new userModel(user);
        user.save()
            .then((createdUser) => {
                logger('info', 'UserModel', ctx, 'New user has been created, id:' + createdUser._id);
                resolve(createdUser);
            })
            .catch((error) => {

                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }

                logger('error', 'UserModel', ctx, error);
                reject({code: 500, messages: 'Internal sever Error'})
            })
    })
};

exports.deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        userModel.remove({_id: id})
            .then(() => {
                logger('error', 'UserModel', 'Deleting User', `User with the id: ${id} has been deleted`);
                resolve();
            })
            .catch(error => {
                logger('error', 'UserModel', 'Deleting User', error);
                reject();
            })
    })
};

exports.modifyUser = function (user) {
    return new Promise((resolve, reject) => {
        userModel.updateOne({_id: user._id}, user)
            .then((userModified) => {
                logger('error', 'UserModel', 'Updating User', `User with the id: ${userModified._id} has been modified`);
                resolve(userModified);
            })
            .catch(error => {
                logger('error', 'UserModel', 'Error updating user', error);
                reject();
            })
    })
};

exports.findUserById = function (ctx, id) {
    return new Promise((resolve, reject) => {
        userModel.findById(id)
            .then((user) => {
                if (!user) {
                    logger('info', 'UserModel', ctx, 'User has not been find by id ' + id);
                    reject({
                        error: 404,
                        message: "Not Found"
                    })
                }
                logger('info', 'UserModel', ctx, 'User has been find by id ' + id);
                resolve(user);
            })
            .catch(error => {
                logger('error', 'UserModel', ctx, error);
                reject();
            })
    })
};