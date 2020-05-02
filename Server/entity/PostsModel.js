const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaPosts = new Schema({
    //_id : ObjectId
    user: {
        type: Schema.Types.ObjectId,
        ref: process.env.DB_USER_COLLECTION,
    },
    //comments : CommentsModel,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: process.env.DB_COMMENTS_COLLECTION,
    }],
    post_time: {
        type: Date,
        default: new Date(),
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: process.env.DB_REACTIONS_COLLECTION,
    }],
    title: String,
    media: String,
});

schemaPosts.pre('find', function () {
    this.populate('comments');
});
schemaPosts.pre('find', function () {
    this.populate('user', '_id name');
});
schemaPosts.pre('find', function () {
    this.populate('reactions');
});
schemaPosts.pre('find', function () {
    this.populate('comments');
});

schemaPosts.pre('findOne', function () {
    this.populate('user', '_id name');
});
schemaPosts.pre('findOne', function () {
    this.populate('reactions');
});
schemaPosts.pre('findOne', function () {
    this.populate('user', '_id name');
});

exports.PostsModel = mongoose.model(process.env.DB_POSTS_COLLECTION, schemaPosts);