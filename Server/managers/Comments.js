const logger = require('../utils/LoggerService');
const CommentsModel = require('../entity/CommentsModel').CommentsModel;
const PostModel = require('../managers/Posts');

exports.createNewComments = function( comments ){  
    logger('debug','PostsModel','Create Comment', '' );
    return new Promise(( resolve , reject )=>{
        if(!comments){
            logger('debug','PostsModel','Create Comment', 'Bad Request no comments on body');
            reject({
                code : 400 ,
                message : "Bad Request"
            });
        }
        const comment = new CommentsModel(comments);
        comment.save()
        .then(( comments )=>{
            logger('debug','PostsModel','Create Comment', 'Comment has been created with id ' + comments._id);
            resolve(comments)
        })
        .catch(( error )=>{
            reject({
                code : 500, 
                messages: "Internal Server Error"
            })
        })
    })
}

exports.modifyComments = function( comments ){
    logger('debug','PostsModel','Create Comment', '' );
    return new Promise(( resolve , reject )=>{
        if(!comments){
            logger('debug','PostsModel','Modify Comment', 'Bad Request no comments on body');
            reject({
                code : 400 ,
                message : "Bad Request"
            });
        }
        new CommentsModel(comments)
        .updateOne()
        .then(( comments )=>{
            logger('debug','PostsModel','Modify Comment', 'Comment has been updated with id ' + comments._id);
            resolve()
        })
        .catch(( error )=>{
            reject({
                code : 500, 
                messages: "Internal Server Error"
            })
        })
    })
}

exports.deleteComments = function( id ){
    return new Promise(( resolve , reject )=>{
        logger('debug','PostsModel','Delete Comment', 'Deleting comments with id ' + id);
        CommentsModel.findOne({_id : id})
        .then(( comments )=>{
            logger('debug','PostsModel','Delete Comment', 'Comment has been Deleted with id ' + id);
            return new CommentsModel(comments).remove()
        })
        .then(()=>{
            resolve()
        })
        .catch(( error )=>{
            logger('error','PostsModel','Delete Comment', 'Comment has been Deleted with error ' + error);
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
    PostModel.findPostByID( comment.posts )
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
        console.log(error)
    })
}
exports.updatePostsDependenciesAtDelete = function( commentDeleted ){   

    PostModel.findPostByID( commentDeleted.posts  )
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

