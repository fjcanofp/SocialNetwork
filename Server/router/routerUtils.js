let express = require('express');
let bodyParser = require("body-parser");
let router = express.Router();
let middleware = require('../utils/middleware').middleware
let security = require('../utils/security');

//Favicon Request
router.get('/favicon.ico', (req, res) => res.status(204));
//Middleware
router.use(middleware.indentifyRequest);
router.use(middleware.interceptorLog);
router.use(middleware.interceptorCORS);
router.use(bodyParser.json());

//Security 
router.use(security.interceptorJWT);

exports.utilsRouter = router;