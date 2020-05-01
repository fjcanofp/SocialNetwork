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
    logger('info', ctx ,__filename , 'Looking for Authenticate');
    return new Promise(function (resolve, reject) {
        userModel.findOne({login: login, password: password})
            .then(user => {
                if (!user) {
                    logger('warn', ctx, __filename , 'User not found');
                    reject({code: 400, messages: 'Not found'});
                    return
                }
                resolve(user)
            })
            .catch(error => {
                logger('error', ctx, __filename , error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
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
    logger('debug', ctx, __filename, 'Creating a new User');
    return new Promise((resolve, reject) => {
        //delete user._id;
        user = new userModel(user);
        user.save()
            .then((createdUser) => {
                logger('info', ctx, __filename, 'New user has been created, id:' + createdUser._id);
                resolve(createdUser);
            })
            .catch((error) => {

                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }

                logger('error', ctx, __filename, error);
                reject({code: 500, messages: 'Internal sever Error'})
            })
    })
};

exports.deleteUser = function ( ctx , id) {
    return new Promise((resolve, reject) => {
        userModel.remove({_id: id})
            .then(() => {
                logger('debug', ctx, 'Deleting User', `User with the id: ${id} has been deleted`);
                resolve();
            })
            .catch(error => {
                logger('error', ctx, 'Deleting User', error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal Server Error'});
            })
    })
};

exports.modifyUser = function (ctx , user) {
    logger('debug',ctx,__filename, "Updating user")
    return new Promise((resolve, reject) => {
        userModel.updateOne({_id: user._id}, user)
            .then((userModified) => {
                logger('info', ctx , __filename, `User with the id: ${userModified._id} has been modified`);
                resolve(userModified);
            })
            .catch(error => {
                logger('error', ctx , __filename, error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal Server Error'});
            })
    })
};

exports.findUserById = function (ctx, id) {
    return new Promise((resolve, reject) => {
        userModel.findById(id)
            .then((user) => {
                if (!user) {
                    logger('info', ctx, __filename, 'User has not been find by id ' + id);
                    reject({
                        error: 404,
                        message: "Not Found"
                    })
                }
                logger('info', ctx, __filename, 'User has been find by id ' + id);
                resolve(user);
            })
            .catch(error => {
                logger('error', ctx, __filename, error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal Server Error'});
            })
    })
};