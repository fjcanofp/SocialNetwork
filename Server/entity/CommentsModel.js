const CommentModel = require("../managers/Comments");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    //_id : ObjectId
    users: {
        type: Schema.Types.ObjectId,
        ref: process.env.DB_USER_COLLECTION,
    },
    posts: {
        type: Schema.Types.ObjectId,
        ref: process.env.DB_POSTS_COLLECTION,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: process.env.DB_REACTIONS_COLLECTION,
    }],
    text: {
        type: String
    },
    comments: {
        parent: {
            type: Schema.Types.ObjectId,
            ref: process.env.DB_COMMENTS_COLLECTION
        },
        childs: [{
            type: Schema.Types.ObjectId,
            ref: process.env.DB_COMMENTS_COLLECTION
        }]
    }
});

/**
 * Cada vez que se guarda se actualizan las referencias de los
 * comentarios en `Posts´
 */
commentSchema.post('save', function (comments, next) {

    if (!comments.posts) {
        CommentModel.updateCommentsDependenciesAtCreate(comments, next)
    } else {
        CommentModel.updatePostsDependenciesAtCreate(comments, next)
    }
});

/**
 * Cada vez que se elimina se actualizan las referencias de los
 * commentarios en `Posts´
 */
commentSchema.pre('remove', {document: true, query: false}, function () {
    if (!this.posts) {
        CommentModel.updateCommentsDependenciesAtDelete(this)
    } else {
        CommentModel.updatePostsDependenciesAtDelete(this)
    }
});

exports.CommentsModel = mongoose.model(process.env.DB_COMMENTS_COLLECTION, commentSchema);