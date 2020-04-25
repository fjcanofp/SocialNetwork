let express = require('express');
let router = express.Router();
let security = require('../utils/security');
let postsManager = require('../managers/Posts');

//====================================//
//             Posts API              //
//====================================//

/**
 *  Lists all Posts
 */
router.get('/posts',(req ,res)=>{
    let user = req.user;
    if(!user){
        return res.status(400).end("Bad Request")
    }
    postsManager.getAllPosts(user)
    .then((posts)=>{
        return res.status(200).json(posts);
    })
    .catch( error =>{
        return res.status(400).end("Bad Request")
    })
});

/**
 *  Busca una publicacion por ID
 */
router.get('/posts/:id',(req ,res)=>{
    let id = req.params.id;
    postsManager.findPostByID(id)
    .then((posts)=>{
        return res.status(200).json(posts);
    })
    .catch( error =>{
        return res.status(400).end("Bad Request")
    })
});

/**
 *  Create a new Posts
 */
router.post('/posts', ( req , res )=>{

    let user = req.user;
    let post = req.body;
    if(!user || !post){
        return res.status(400).end("Bad Request")
    }

    post.user = user._id;

    postsManager.createNewPosts(post)
    .then(()=>{
        return res.status(200).json({ code: 200 , message : "Posts has been created"})
    })
    .catch( error =>{
        if(error.code = 500){
            return res.status(400).end("Bad Request")
        }
        else{
            return res.status(500).end("Internal server Error")
        }
    })
})

/**
 * Delete a posts
 */
router.delete('/posts/:id', ( req , res )=>{
    let id = req.params.id;
    postsManager.deletePosts(id)
    .then(()=>{
        return res.status(200).json({ code: 200 , message : "Posts has been deleteds"})
    })
    .catch( error =>{
        if(error.code = 500){
            return res.status(400).end("Bad Request")
        }
        else{
            return res.status(500).end("Internal server Error")
        }
    })
});
/**
 * Modify a posts
 */
router.put('/posts/:id', (req ,res )=>{

    let id = req.params.id;
    let user = req.user;
    let post = req.body;

    if(!user || !post){
        return res.status(400).end("Bad Request");
    }
    
    if(post._id != id ){
        return res.status(401).end('Unauthorized');
    }
    
    if(user._id != post.user){
        return res.status(401).end('Unauthorized');
    }

    postsManager.modifyPosts(post)
    .then(()=>{
        return res.status(200).json({ code: 200 , message : "Posts has been modify"})
    })
    .catch( error =>{
        if(error.code = 500){
            return res.status(400).end("Bad Request")
        }
        else{
            return res.status(500).end("Internal server Error")
        }
    })
});

exports.postsRouter = router;