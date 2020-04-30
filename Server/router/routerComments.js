let express = require('express');
let router = express.Router();
let security = require('../utils/security');
let commentsManager = require('../managers/Comments');
const logger = require('../utils/LoggerService');

//=======================================//
//             Comments API              //
//=======================================//

/**
 * Register a new Comments to a comment
 */
router.post('/comment/:id_comentarios/comment/',(req ,res)=>{
    logger('info',req.id,__filename,"Start: create a new comment on a comment")
    let idComentarios = req.params.id_comentarios;
    let comment = req.body;
    comment.comments = {};
    comment.comments.parent = idComentarios;
    comment.posts = null ;
    commentsManager.createNewComments(comment)
    .then(( comment )=>{
        logger('debug',req.id,__filename,"a new comment on a comment has been created")
        return res.status(201).json( comment );
    })
    .catch( error =>{
        logger('error',req.id,__filename, error)
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: create a new comment on a comment")
    })
});

/**
 * Register a new comment to a posts
 */
router.post('/posts/:id/comment/',(req ,res)=>{
    logger('info',req.id,__filename,"Start: create a new comment on a post")
    let idPosts = req.params.id;
    let comment = req.body;
    comment.posts = idPosts;
    comment.comments = null;
    commentsManager.createNewComments(req.id , comment)
    .then(( comment )=>{
        logger('debug',req.id,__filename,"A new comment on a post has been created "+ comment._id)
        return res.status(201).json( comment );
    })
    .catch( error =>{
        logger('error',req.id,__filename,error)
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: create a new comment on a post")
    })
});

/**
 * Delete a comments of a comments
 */
router.delete('/comments/:id', ( req , res )=>{
    logger('info',req.id,__filename,"Start: delete a comment")
    let id = req.params.id;
    commentsManager.deleteComments(req.id , id)
    .then(( comment )=>{
        logger('debug',req.id,__filename,"Comments has been deleted id : " + id)
        return res.status(200).json( comment );
    })
    .catch( error =>{
        logger('error',req.id,__filename,error)
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: delete a comment")
    })
});

/**
 * Modify a comments of a comments
 */
router.put('/comments/:id_comments', ( req , res )=>{   
    let idComment = req.params.id_comments;
    let comment = req.body;

    comment._id = idComment;
    logger('info',req.id,__filename,"Start modify a comment")
    commentsManager.modifyComments(req.id , comment)
    .then(( comment )=>{
        return res.status(200).json( comment );
    })
    .catch( error =>{
        logger('error',req.id,__filename,error)
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End delete a comment")
    })
});

exports.commentsRouter = router;