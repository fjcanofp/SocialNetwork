let express = require('express');
let router = express.Router();
let security = require('../utils/security');
let postsManager = require('../managers/Posts');
const logger = require('../utils/LoggerService');
//====================================//
//             Posts API              //
//====================================//

/**
 *  Lists all Posts
 */
router.get('/posts',(req ,res)=>{
    logger('info',req.id,__filename,"Start: Get posts")
    postsManager.getAllPosts(req.id , user)
    .then((posts)=>{
        logger('info',req.id,__filename,"Posts has been finded")
        return res.status(200).json(posts);
    })
    .catch( error =>{
        logger('error',req.id,__filename,"Error retriving posts "+error)
        return res.status(error.code).end(error.message)
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: Get posts")
    })
});

/**
 *  Retrive a posts by ID
 */
router.get('/posts/:id',(req ,res)=>{
    logger('info',req.id,__filename,"Start: Get posts by id")
    let id = req.params.id;
    postsManager.findPostByID(req.id, id)
    .then((posts)=>{
        return res.status(200).json(posts);
    })
    .catch( error =>{
        logger('error',req.id,__filename,"Error retriving post")
        return res.status(error.code).end(error.messages);
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: Get posts by id");
    })
});

/**
 *  Create a new Posts
 */
router.post('/posts', ( req , res )=>{
    logger('info',req.id,__filename,"Start: Creating post")
    let user = req.user;
    let post = req.body;
    if(!user || !post){
        return res.status(400).end("Bad Request")
    }

    post.user = user._id;

    postsManager.createNewPosts(req.id , post)
    .then(()=>{
        logger('debug',req.id,__filename,"Posts has been created")
        return res.status(200).json({ code: 200 , message : "Posts has been created"})
    })
    .catch( error =>{
        logger('debug', req.id , __filename, error.messages)
        return res.status(error.code).end(error.messages)
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: Creating post")
    })
})

/**
 * Delete a posts
 */
router.delete('/posts/:id', ( req , res )=>{
    let id = req.params.id;
    logger('info',req.id,__filename,"Start: Delete posts by id ")
    postsManager.deletePosts(req.id , id)
    .then(()=>{
        logger('debug',req.id,__filename,"posts deleted "+id)
        return res.status(200).json({ code: 200 , message : "Posts has been deleted"})
    })
    .catch( error =>{
        logger('error',req.id,__filename, error )
        if(error.code = 500){
            return res.status(400).end("Bad Request")
        }
        else{
            return res.status(500).end("Internal server Error")
        }
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: Delete posts by id ")
    })
});

/**
 * Modify a posts
 */
router.put('/posts/:id', (req ,res )=>{

    let id = req.params.id;
    let user = req.user;
    let post = req.body;

    logger('info',req.id,__filename,"Start: Modify posts by id ")

    if(post._id != id ){
        logger('warn',req.id,__filename," security url and post id are diferents")
        return res.status(401).end('Unauthorized');
    }
    
    if(user._id != post.user){
        logger('warn',req.id,__filename," security cannot modify a post of another user")
        return res.status(401).end('Unauthorized');
    }

    postsManager.modifyPosts(req.id ,post)
    .then(()=>{
        return res.status(200).json({ code: 200 , message : "Posts has been modify"})
    })
    .catch( error =>{
        logger('error',req.id,__filename, error )
        if(error.code = 500){
            return res.status(400).end("Bad Request")
        }
        else{
            return res.status(500).end("Internal server Error")
        }
    })
    .finally(()=>{
        logger('info',req.id,__filename,"End: Modify posts by id ")
    })
});

exports.postsRouter = router;