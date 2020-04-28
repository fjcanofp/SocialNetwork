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
    logger('info', req.id, __filename, 'INICIO : Creando un nuevo usuario.');
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
            logger('info', req.id, __filename, '201 Usuario Creado');

            const userForToken = {
                username: createdUser.username,
                id: createdUser._id,
            }

            const token = jwt.sign(userForToken, process.env.SECRET);

            return res.status(201).send({ token , user: user });
        })
        .catch(error => {
            logger('error', req.id, __filename, 'Error : ' + error.message);
            return res.status(error.code).json(error);
        })
        .finally(() => {
            logger('info', req.id, __filename, 'FIN : Creando un nuevo usuario.');
        })

});

/**
 *  Modify a User
 */
router.put('/user/:id', (req, res) => {
    logger('info', req.id, __filename, 'INICIO : Modificando un nuevo usuario.');

    let user = req.body;
    let id = req.params.id;
    user._id = id;

    if (id != req.user._id) {
        logger('warn', req.id, __filename, '401 unauthorized');
        return res.status(401).json({ code: '400', message: 'Bad Request' })
    }


    userManager.modifyUser(user)
        .then((user) => {
            logger('info', req.id, __filename, 'Usuario a sido modificado ');
            return res.status(200).json({ code: 200, message: 'Ok ' });
        })
        .catch(error => {
            logger('error', req.id, __filename, 'Error al modificar un usuario ' + error);
            return res.status(400).end("Bad Request");
        })
        .finally(() => {
            logger('info', req.id, __filename, 'FIN : Modificando un nuevo usuario.');
        })
})

/**
 * Delete a users
 */
router.delete('/user/:id', (req, res) => {

    let user = req.body;
    let id = req.params.id;

    if (user._id != id) {
        return res.status(400).end("Bad Request")
    }

    userManager.deleteUser(id)
        .then(() => {
            return res.status(200).json({ code: 200, message: "User has been deleted" })
        })
        .catch(error => {
            return res.status(400).end("Bad Request")
        })
});

router.get('/user/:id', (req, res) => {
    
    let id = req.params.id;

    userManager.findUserById(req.id, id)
        .then((user) => {
            return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(error.error).end("Bad Request");
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