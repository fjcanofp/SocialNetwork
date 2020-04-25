let express = require('express');
let router = express.Router();
let reactionsModels = require('../managers/Reactions');

//========================================//
//             Reactions API              //
//========================================//

/**
 * Register a new Reactions to a comment
 */
router.post('/comment/:id/reaction/',(req ,res)=>{
    let id = req.params.id;
    let reaction = req.body;

    reaction.comments = id;
    reaction.posts = null;

    reactionsModels.createNewReactions(reaction)
    .then(( comment )=>{
        return res.status(200).json( comment );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
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

    reactionsModels.createNewReactions(reaction)
    .then(( comment )=>{
        return res.status(200).json( comment );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});

/**
 * Delete a Reaction of a comments
 */
router.delete('/reaction/:id', ( req , res )=>{
    let id = req.params.id;
    reactionsModels.deleteReactions(id)
    .then(( )=>{
        return res.status(200).json();
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});

exports.reactionRouter = router;