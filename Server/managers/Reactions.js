const ReactionsModels = require('../entity/ReactionsModel').ReactionsModels;
const CommentsModel = require('../entity/CommentsModel').CommentsModel;
const PostModel = require('../entity/PostsModel').PostsModel;
const logger = require('../utils/LoggerService');

exports.createNewReactions = function( ctx , reactions ){
    return new Promise(( resolve , reject )=>{
        if(!reactions){
            logger('debug',ctx,__filename, 'Bad Request: No reactions on the body found');
            reject({
                code : 400 ,
                messages : "Bad Request"
            });
        }
        new ReactionsModels(reactions)
        .save()
        .then(( reactions )=>{
            logger('debug',ctx,__filename, 'Reaction has been created with id ' + reactions._id);
            resolve()
        })
        .catch(( error )=>{
            logger('error',ctx, __filename, 'ERROR ' + error );
            reject({
                code : 500, 
                messages: "Internal Server Error"
            })
        })
    })
}

exports.deleteReactions = function( ctx ,  id ){
    return new Promise(( resolve , reject )=>{
        ReactionsModels.deleteOne({ _id : id })
        .then(( reactions )=>{
            logger('debug',ctx,__filename, 'Reaction has been Deleted with id ' + reactions._id);
            resolve()
        })
        .catch(( error )=>{
            logger('error',ctx,__filename, 'ERROR ' + error );
            reject({
                code : 500, 
                messages: "Internal Server Error"
            })
        })
    })
}

exports.updateCommentsDependenciesAtCreate = function( reaction ){
    CommentsModel.findById( reaction.comments )
            .then( comment =>{
                logger('debug',ctx,__filename, 'adding reaction to comments' + reaction.comments);
                comment.reactions.push(reaction._id);
                CommentsModel.updateOne({ _id : comment._id} , comment)
            })
            .then(()=>{
                // Modificadas las dependencias
                logger('debug',ctx,__filename, 'satisfied dependencies');
            })
            .catch( error =>{
                logger('error',ctx,__filename, 'Error at satisfied dependencies'+error);
            })
}

exports.updatePostsDependenciesAtCreate = function( reaction ){
    PostModel.findById(reaction.post )
            .then( post =>{
                post.reactions.push(reaction._id);
                PostModel.modifyPosts(post)
            })
            .then(()=>{
                // Modificadas las dependencias
            })
            .catch( error =>{
            })
}

exports.updateCommentsDependenciesAtDelete = function( reaction ){   
    CommentsModel.findById( reaction.comment )
    .then( comment =>{
        let arrAux = [];
        for (const i of comment.reactions) {
            if(reaction._id != comment._id){
                arrAux.push(i._id)
            }
        }
        comment.reactions = arrAux;
        CommentsModel.updateOne({ _id : comment._id},comment);
    })
    .then(()=>{
        //All dependencies Ready
    })
    .catch( error =>{
    })
}
exports.updatePostsDependenciesAtDelete = function( reaction ){   
    PostModel.findById(reaction.posts  )
    .then( posts =>{
        let arrAux = []
        for (const iterator of posts.reactions ) {
            if(iterator._id != reaction._id){
                arrAux.push(iterator._id)
            }
        }
        posts.reactions = arrAux;
        PostModel.modifyPosts(posts);
    })
    .then(()=>{
        // Updated Dependencies
    })
    .catch( error =>{
    })
}
