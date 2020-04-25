const logger = require('../utils/LoggerService');
const PostsModel = require('../entity/PostsModel').PostsModel;


exports.findPostByID = function (id) {
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
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.getAllPosts = function (User) {
    logger('debug', 'PostsModel', 'Listing post', 'Listing post');
    return new Promise((resolve, reject) => {
        if (!User) {
            logger('debug', 'postModel', 'Listing post', '');
            reject({
                code: 400,
                message: "Bad request"
            })
        }
        PostsModel.find()
            .then((posts) => {
                logger('info', 'postModel', 'Listing post', '');
                resolve(posts)
            })
            .catch((error) => {
                logger('error', 'postModel', 'Listing post', error);
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.createNewPosts = function (posts) {
    return new Promise((resolve, reject) => {
        logger('debug', 'PostsModel', 'Creating post', 'Creating a new post');
        if (!posts) {
            logger('debug', 'postModel', 'Creating post', 'post cannot be null');
            reject({
                code: 400,
                message: "Bad request"
            })
        }

        delete posts._id;

        posts = new PostsModel(posts);
        posts.save()
            .then((postCreated) => {
                logger('info', 'postModel', 'Creating post', 'New post has been created id:' + postCreated._id);
                resolve({
                    code: 200,
                    message: "post has been created"
                })
            })
            .catch((error) => {
                logger('error', 'postModel', 'Creating post', error);
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.modifyPosts = function (posts) {
    return new Promise((resolve, reject) => {
        logger('debug', 'PostsModel', 'Modifing post', ' Start Modifing post');
        if (!posts) {
            logger('debug', 'postModel', 'Modifing post', 'post cannot be null');
            reject({
                code: 400,
                message: "Bad request"
            })
        }
        PostsModel.updateOne({_id: posts._id}, posts)
            .then(() => {
                logger('info', 'postModel', 'Modifing post', 'New post has been modify id :' + posts._id);
                resolve({
                    code: 200,
                    message: "post has been created"
                })
            })
            .catch((error) => {
                logger('error', 'postModel', 'Modifing post', error);
                reject({code: 500, messages: 'Internal sever error'})
            })
    })
};

exports.deletePosts = function (id) {
    return new Promise((resolve, reject) => {
        logger('debug', 'PostsModel', 'Deleting post', 'Deleting new post');
        if (!id) {
            logger('debug', 'postModel', 'Deleting post', 'post cannot be null');
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