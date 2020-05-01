let express = require('express');
let router = express.Router();
let reactionsModels = require('../managers/Reactions');
let logger = require('../utils/LoggerService');
//========================================//
//             Reactions API              //
//========================================//

/**
 * Register a new Reactions to a comment
 */
router.post('/comment/:id/reaction/',(req ,res)=>{
    let id = req.params.id;
    let reaction = req.body;
    logger('info',req.id, __filename, "Start Creating reaction on comment "+id)

    reaction.comments = id;
    reaction.posts = null;

    reactionsModels.createNewReactions( req.id , reaction)
    .then(( comment )=>{
        logger('debug',req.id, __filename, "Comment has been created")
        return res.status(201).json( comment );
    })
    .catch( error =>{
        logger('error',req.id, __filename, "Error at create reactions on comments")
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id, __filename, "End reaction on comment "+id)
    })
});
/**
 * Register a new Reactions to a posts
 */
router.post('/posts/:id/reaction/',(req ,res)=>{
    let idPosts = req.params.id;
    let reaction = req.body;

    reaction.posts = idPosts;
    reaction.comments = null;

    logger('info',req.id, __filename, "Start Creating reaction on post "+ idPosts)

    reactionsModels.createNewReactions(req.id , reaction)
    .then(( comment )=>{
        logger('debug',req.id, __filename, "Comment has been created")
        return res.status(201).json( comment );
    })
    .catch( error =>{
        logger('error',req.id, __filename, "Error at create reactions on post " + idPosts)
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id, __filename, "End reaction on posts "+idPosts)
    })
});

/**
 * Delete a Reaction of a comments
 */
router.delete('/reaction/:id', ( req , res )=>{
    let id = req.params.id;
    logger('info',req.id, __filename, "Start removed reaction "+id)
    reactionsModels.deleteReactions(req.id , id)
    .then(( )=>{
        logger('debug',req.id, __filename, "Reaction has been removed "+id)
        return res.status(200).json();
    })
    .catch( error =>{
        logger('error',req.id, __filename, "Error at delete reaction "+id)
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id, __filename, "End removed reaction "+id)
    })
});

exports.reactionRouter = router;