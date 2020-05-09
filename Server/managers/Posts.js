const logger = require('../utils/LoggerService');
const PostsModel = require('../entity/PostsModel').PostsModel;
const mongoose = require('mongoose');
let FileService = require('../utils/FileService');


exports.getPostOfUserByID = function( ctx , id ){
    logger('debug', ctx ,__filename, 'Searching post ' + id);
    return new Promise((resolve, reject) => {
        PostsModel.find({ user : id }).sort({post_time : -1 })
        .then(posts=>{
            logger('debug', ctx ,__filename, 'Searching post');
            resolve(posts);
        })
        .catch( error=>{
            logger('error', ctx ,__filename, error);
                if (error instanceof mongoose.Error) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal sever Error'})
        })
    })  
} 

exports.findPostByID = function (ctx , id) {
    let post_end = {};
    logger('debug', ctx ,__filename, 'Searching post ' + id);
    return new Promise((resolve, reject) => {
        PostsModel.findOne({ _id : id }).populate('media').exec()
            .then((post) => {
                if (!post) {
                    logger('info', ctx ,__filename, 'no post with id ' + id);
                    reject({
                        code: 400,
                        messages: "Not Found"
                    })
                }
                post_end = post.toObject();
                logger('info', ctx ,__filename, 'Post with id  ' + id + " found");
                resolve(post_end)
                //return FileService.getFile(post.media)
            })
            //.then((chunks)=>{
                //    post_end.media.srs = chunks;
            //})
            .catch((error) => {
                logger('error', ctx ,__filename, error);
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
        PostsModel.find({}).sort({post_time : -1 }).populate('media')
            .then((posts) => {
                logger('info', ctx , __filename , 'post has been found ');
                resolve(posts)
            })
            .catch((error) => {
                logger('error',  ctx , __filename , error);
                if (code instanceof mongoose.Error) {
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

        posts = new PostsModel(posts);
        posts.save()
            .then((postCreated) => {
                logger('info', ctx, __filename, 'New post has been created id:' + postCreated._id);
                resolve(postCreated)
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
                if (error instanceof mongoose.Error.ValidationError) {
                    reject({code: 400, messages: 'Bad Request'})
                }
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.deletePosts = function (ctx , id) {
    return new Promise((resolve, reject) => {
        logger('debug', ctx, __filename, 'Deleting new post '+ id );
        if (!id) {
            logger('debug', ctx, __filename, 'post cannot be null');
            reject({
                code: 400,
                message: "Bad request"
            })
        }

        PostsModel.findByIdAndDelete({ _id : id })
            .then((post) => {
                if(post.media){
                    return FileService.deleteFile(post.media)
                }
            })
            .then(()=>{
                logger('info', ctx, __filename, 'New post has been deleted id:' + id);
                resolve({
                    code: 200,
                    message: "post has been deleted"
                })
            })
            .catch((error) => {
                logger('error', ctx, __filename, error);
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};