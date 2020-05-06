const logger = require('../utils/LoggerService');
const CommentsModel = require('../entity/CommentsModel').CommentsModel;
const PostModel = require('../managers/Posts');

exports.createNewComments = function( ctx , comments ){  
    logger('debug',ctx,__filename, 'Creating new comment' );
    return new Promise(( resolve , reject )=>{
        if(!comments){
            logger('debug',ctx,__filename, 'Bad Request no comments on body');
            reject({
                code : 400 ,
                messages : "Bad Request"
            });
        }
        const comment = new CommentsModel(comments);
        comment.save()
        .then(( comments )=>{
            logger('debug',ctx,__filename, 'Comment has been created with id ' + comments._id);
            resolve(comments)
        })
        .catch(( error )=>{
            logger('error',ctx,__filename, error);
            reject({
                code : 500, 
                messages: "Internal Server Error"
            })
        })
    })
}

exports.modifyComments = function( ctx , comments ){
    logger('debug',ctx,__filename, 'Modifing a comment' );
    return new Promise(( resolve , reject )=>{
        if(!comments){
            logger('debug',ctx,__filename, 'Bad Request no comments on body');
            reject({
                code : 400 ,
                messages : "Bad Request"
            });
        }
        //new CommentsModel(comments).update()
        CommentsModel.updateOne({ _id : comments._id }, comments )
        .then(( comments )=>{
            logger('debug',ctx,__filename, 'Comment has been updated with id ' + comments._id);
            resolve()
        })
        .catch(( error )=>{
            logger('error',ctx,__filename, error);
            reject({
                code : 500, 
                messages: "Internal Server Error"
            })
        })
    })
}

exports.deleteComments = function( ctx , id ){
    return new Promise(( resolve , reject )=>{
        logger('debug',ctx,__filename, 'Deleting comments with id ' + id);
        CommentsModel.findOne({_id : id})
        .then(( comments )=>{
            logger('debug',ctx,__filename, 'Comment has been Deleted with id ' + id);
            return new CommentsModel(comments).remove()
        })
        .then(()=>{
            resolve()
        })
        .catch(( error )=>{
            logger('error',ctx,__filename, 'Comment has been Deleted with error ' + error);
            reject({
                code : 500, 
                messages: "Internal Server Error"
            })
        })
    })
}

exports.updateCommentsDependenciesAtCreate = function( comment , next  ){

    CommentsModel.findOne({ _id :  comment.comments.parent  })
            .then( commentParent =>{
                commentParent.comments.childs.push(comment._id);
                return CommentsModel.updateOne({ _id : commentParent._id }, commentParent);
            })
            .then(( comment )=>{
                // Modificadas las dependencias
                next();
            })
            .catch( error =>{
            })
}

exports.updatePostsDependenciesAtCreate = function( comment , next ){
    logger('debug',__filename,'Adding reference of comment on posts',comment._id);
    PostModel.findPostByID('BATCH', comment.posts )
    .then( post =>{
                logger('debug',__filename,'Post of reference find ',post._id);
                post.comments.push(comment._id);
                logger('debug',__filename,'Modify post to add comment reference',post._id);
                PostModel.modifyPosts(post)
            })
            .then(()=>{
                // Modificadas las dependencias
                next();
            })
            .catch( error =>{
                next();
            })
}

exports.updateCommentsDependenciesAtDelete = function( commentDeleted ){
    CommentsModel.findById(commentDeleted.comments.parent)
    .then(commentParent =>{
        let comment = [];
        for ( const iterator of commentParent.comments.childs ) {
            if(!commentDeleted._id.equals(iterator._id)){
                comment.push(iterator._id);
            }
        }
        commentParent.comments.childs = comment;
        return CommentsModel.updateOne({ _id : commentParent._id }, commentParent )
    })
    .then(()=>{
        return CommentsModel.deleteMany({ 'comments.parent' : commentDeleted._id })
    })
    .then(()=>{
        //FIN //LOGER HERE
    })
    .catch((error)=>{
    })
}
exports.updatePostsDependenciesAtDelete = function( commentDeleted ){   

    PostModel.findPostByID('BATCH', commentDeleted.posts  )
    .then( cPosts =>{
        let arrAux = []
        for (const iterator of cPosts.comments) {
            if(!iterator._id.equals(commentDeleted._id)){
                arrAux.push(iterator._id)
            }
        }
        cPosts.comments = arrAux;
        return PostModel.modifyPosts(cPosts)
    })
    .then(( )=>{
        // Updated Dependencies
    })
    .catch( error =>{

    })
}

