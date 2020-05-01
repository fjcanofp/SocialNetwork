let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
let userManager = require('../managers/Users')
let User = require('../entity/UsersModel').UsersModel;
let logger = require('../utils/LoggerService');
//====================================//
//             Users API              //
//====================================//

/**
 * Register a new Users
 */
router.post('/register',  (req, res) => {
    logger('info', req.id, __filename, 'Start : Creating new users.');
    let user = req.body;

    if(!user.password || !user.login){
        logger('error', req.id, __filename, 'Not content on body');
        return res.status(400).json({ code:400 , message : "Bad Request"});
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    
    user.password = hash;
    userManager.signUpUser(req.id, user)
        .then(( createdUser ) => {
            logger('info', req.id, __filename, 'user has been created');

            const userForToken = {
                username: createdUser.username,
                id: createdUser._id,
            }

            const token = jwt.sign(userForToken, process.env.SECRET);

            return res.status(201).send({ token , user: user });
        })
        .catch(error => {
            logger('error', req.id, __filename, 'Error : ' + error.messages);
            return res.status(error.code).end(error.messages);
        })
        .finally(() => {
            logger('info', req.id, __filename, 'END : Creating new users.');
        })

});

/**
 *  Modify a User
 */
router.put('/user/:id', (req, res) => {
    logger('info', req.id, __filename, 'Start : updating  a user.');

    let user = req.body;
    let id = req.params.id;
    user._id = id;

    if (id != req.user._id) {
        logger('warn', req.id, __filename, '401 unauthorized');
        return res.status(401).json({ code: '400', message: 'Bad Request' })
    }


    userManager.modifyUser(req.id , user)
        .then((user) => {
            logger('info', req.id, __filename, 'user has been modified with id '+id);
            return res.status(200).json({ code: 200, message: 'Ok ' });
        })
        .catch(error => {
            logger('error', req.id, __filename, 'error updating user :' + error);
            return res.status(error.code).end(error.messages);
        })
        .finally(() => {
            logger('info', req.id, __filename, 'End : updating  a user.');
        })
})

/**
 * Delete a users
 */
router.delete('/user/:id', (req, res) => {
    logger('info',req.id,__filename,"Start: delete user.");
    let user = req.user;
    let id = req.params.id;

    if (user.id != id)  {
        logger('warn',req.id,__filename,"Security validations fail")
        return res.status(400).end("Bad Request")
    }

    userManager.deleteUser(req.id , id)
        .then(() => {
            logger('debug',req.id,__filename,"User has been deleted with id "+id)
            return res.status(200).json({ code: 200, message: "User has been deleted" })
        })
        .catch(error => {
            logger('error',req.id,__filename,"Error deleting user with id "+id)
            return res.status(error.code).end(error.messages);
        })
        .finally(()=>{
            logger('info',req.id,__filename,"End: delete user.")
        })
});

router.get('/user/:id', (req, res) => {
    
    let id = req.params.id;

    userManager.findUserById(req.id, id)
        .then((user) => {
            return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(error.code).end(error.messages);
        })
});

router.post('/login', async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ login : body.login });

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid login or password'
        })
    }

    const userForToken = {
        login: user.login,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET);

    res
        .status(200)
        .send({ token , user: user });

});

exports.userRouter = router;