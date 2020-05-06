let express = require('express');
let router = express.Router();
let followManager = require('../managers/Follow');
let logger = require('../utils/LoggerService')
router.post('/user/:id/follow', (req, res) => {
    let user = req.user;
    logger('info', req.id, __filename, "Add follower to user" + user._id)
    followManager.addFollow(req.id, user, req.params.id)
        .then(followers => {
            return res.json(followers).end();
        })
        .catch(error => {
            logger('error', req.id, __filename, "Error Add follower to user" + user._id)
            return res.status(error.code).end(error.messages);
        })
        .finally(() => {
            logger('info', req.id, __filename, "Add follower to user " + user._id)
        })
})

router.get('/followers', (req, res) => {
    let user = req.user;
    logger('info', req.id, __filename, "Retriving follower of user" + user._id)
    followManager.getFollower(req.id, user)
        .then(followers => {
            return res.json(followers).end();
        })
        .catch(error => {
            logger('error', req.id, __filename, "Error retriving follower of user" + user._id)
            return res.status(error.code).end(error.messages);
        })
        .finally(() => {
            logger('info', req.id, __filename, "End Retriving follower of user" + user._id)
        })
})

router.delete('/user/:id/follow', (req, res) => {
    let user = req.user;
    logger('info', req.id, __filename, "Removing follower of user" + user._id)
    followManager.rmFollow(req.id ,user , req.params.id)
        .then(() => {
            return res.end("Follow has been removed");
        })
        .catch(error => {
            logger('error', req.id, __filename, "Error Removing follower of user" + user._id)
            return res.status(400).end(error.messages);
        })
        .finally(() => {
            logger('info', req.id, __filename, "End Removing follower of user" + user._id)
        })
})

exports.routerFollow = router;