const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ReactionsModel = require('../managers/Reactions');

const reactionsModels = Schema({
    //_id : ObjectId
    users: { 
        type: Schema.Types.ObjectId, 
        ref: process.env.DB_USER_COLLECTION, 
    },
    posts: { 
        type: Schema.Types.ObjectId, 
        ref: process.env.DB_POSTS_COLLECTION, 
    },
    comments : { 
        type: Schema.Types.ObjectId, 
        ref: process.env.DB_COMMENTS_COLLECTION, 
    },
    reaction: {
        type: String,
        enum: ['like', 'dislike', 'sad' , 'fun'],
    }
});

 /**
     * Cada ves que se guarda se actualizan las referencias de los 
     * reaciones en `Comentarios´
     */
    reactionsModels.post('save', function( reaction ) {
        if( reaction.comment ){
            ReactionsModel.updateCommentsDependenciesAtCreate(reaction)
        }
        else{
            ReactionsModel.updatePostsDependenciesAtCreate(reaction)
        }
    });

    /**
     * Cada ves que se elimina se actualizan las referencias de los 
     * reaciones en `Posts´
     */
    reactionsModels.post('remove', function( reaction ) {
        if(reaction.comments){
            ReactionsModel.updateCommentsDependenciesAtDelete(reaction)
        }
        else{
            ReactionsModel.updatePostsDependenciesAtDelete(reaction)
        }
    });

exports.ReactionsModels = mongoose.model(process.env.DB_REACTIONS_COLLECTION, reactionsModels);;