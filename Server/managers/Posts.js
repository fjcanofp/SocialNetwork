const logger = require('../utils/LoggerService');
const PostsModel = require('../entity/PostsModel').PostsModel;
const mongoose = require('mongoose');

exports.findPostByID = function (ctx , id) {
    logger('debug', 'PostsModel', 'Listing post', 'Searching post ' + id);
    return new Promise((resolve, reject) => {
        PostsModel.findById(id)
            .then((post) => {
                if (!post) {
                    logger('info', 'postModel', 'Listing post', 'no post with id ' + id);
                    reject({
                        code: 400,
                        messages: "Not Found"
                    })
                }
                logger('info', 'postModel', 'Listing post', 'Post with id  ' + id + "found");
                resolve(post)
            })
            .catch((error) => {
                logger('error', 'postModel', 'Listing post', error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal sever Error'})
            })
    })
};

exports.getAllPosts = function (ctx , user) {
    logger('debug', ctx , __filename , 'Listing post');
    return new Promise((resolve, reject) => {
        PostsModel.find()
            .then((posts) => {
                logger('info', ctx , __filename , 'post has been found : ' + posts.length());
                resolve(posts)
            })
            .catch((error) => {
                logger('error',  ctx , __filename , error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.createNewPosts = function (ctx , posts) {
    return new Promise((resolve, reject) => {
        logger('debug', ctx , __filename, 'Creating a new post');
        if (!posts) {
            logger('debug', ctx , __filename, 'post cannot be null');
            reject({
                code: 400,
                message: "Bad request"
            })
        }

        delete posts._id;

        posts = new PostsModel(posts);
        posts.save()
            .then((postCreated) => {
                logger('info', ctx, __filename, 'New post has been created id:' + postCreated._id);
                resolve({
                    code: 200,
                    message: "post has been created"
                })
            })
            .catch((error) => {
                logger('error',  ctx , __filename , error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.modifyPosts = function (ctx , posts) {
    return new Promise((resolve, reject) => {
        logger('debug', ctx , __filename , ' Start Modifing post');
        if (!posts) {
            logger('debug', ctx, __filename , 'post cannot be null');
            reject({
                code: 400,
                message: "Bad request"
            })
        }
        PostsModel.updateOne({_id: posts._id}, posts)
            .then(() => {
                logger('info', ctx, __filename , 'New post has been modify id :' + posts._id);
                resolve({
                    code: 200,
                    message: "post has been created"
                })
            })
            .catch((error) => {
                logger('error', ctx , __filename , error);
                logger('error',  ctx , __filename , error);
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.deletePosts = function (ctx , id) {
    return new Promise((resolve, reject) => {
        logger('debug', 'PostsModel', 'Deleting post', 'Deleting new post');
        if (!id) {
            logger('debug', ctx, 'Deleting post', 'post cannot be null');
            reject({
                code: 400,
                message: "Bad request"
            })
        }

        PostsModel.deleteOne({_id: id})
            .then(() => {
                logger('info', 'postModel', 'Deleting post', 'New post has been deleted id:' + id);
                resolve({
                    code: 200,
                    message: "post has been deleted"
                })
            })
            .catch((error) => {
                logger('error', 'postModel', 'Deleting post', error);
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};