let express = require('express');
let router = express.Router();
let security = require('../utils/security');
let commentsManager = require('../managers/Comments');

//=======================================//
//             Comments API              //
//=======================================//

/**
 * Register a new Comments to a comment
 */
router.post('/comment/:id_comentarios/comment/',(req ,res)=>{
    let idComentarios = req.params.id_comentarios;
    let comment = req.body;
    comment.comments = {};
    comment.comments.parent = idComentarios;
    comment.posts = null ;
    commentsManager.createNewComments(comment)
    .then(( comment )=>{
        return res.status(200).json( comment );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});

/**
 * Register a new comment to a posts
 */
router.post('/posts/:id/comment/',(req ,res)=>{
    let idPosts = req.params.id;
    let comment = req.body;
    comment.posts = idPosts;
    comment.comments = null;
    commentsManager.createNewComments(comment)
    .then(( comment )=>{
        return res.status(200).json( comment );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});

/**
 * Delete a comments of a comments
 */
router.delete('/comments/:id', ( req , res )=>{
    let id = req.params.id;
    commentsManager.deleteComments(id)
    .then(( comment )=>{
        return res.status(200).json( comment );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});

/**
 * Modify a comments of a comments
 */
router.put('/comments/:id_comments', ( req , res )=>{   
    let idComment = req.params.id_comments;
    let comment = req.body;

    comment._id = idComment;

    commentsManager.modifyComments(comment)
    .then(( comment )=>{
        return res.status(200).json( comment );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});

exports.commentsRouter = router;