let multer = require("multer");
let upload = multer({dest : '../temp'});
let express = require('express');
let bodyParser = require("body-parser");
let router = express.Router();
let middleware = require('../utils/middleware').middleware
let security = require('../utils/security');
let fileupload = require('../utils/FileService')
//Favicon Request
router.get('/favicon.ico', (req, res) => res.status(204));
//Middleware
router.use(middleware.indentifyRequest);
router.use(middleware.interceptorLog);
router.use(middleware.interceptorCORS);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// in latest body-parser use like below.
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.any())
//Security 
router.use(security.interceptorJWT);

router.get('/file/:id', (req , res )=>{
    fileupload.getFile( req.params.id , res )
})
exports.utilsRouter = router;