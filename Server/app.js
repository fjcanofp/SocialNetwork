let express = require("express")
let http = require("http")
let mailer = require('./utils/mailer')
let db_util = require("./utils/db_connection")

let dotenv = require('dotenv');
dotenv.config();

let routerUtil = require('./router/routerUtils').utilsRouter;
let routerUsers = require('./router/routerUsers').userRouter;
let routerPosts = require('./router/routerPosts').postsRouter;
let routerComment = require('./router/routerComments').commentsRouter;
let routerEvents = require('./router/routerEvents').eventsRouter;
let routerReaction = require('./router/routerReactions').reactionRouter;

let logger = require('./utils/LoggerService')

logger('info','SERVER','APP.JS','Starting...');

db_util.conectar()
.then(arrancarServidor)
.catch(error => {
    logger('error','SERVER','APP.JS',`${error.code} : ${error.message}`);
    process.exit(1)
})

function arrancarServidor(){    
    logger('info','SERVER','APP.JS','Starting server ...')
    let app = express();

    app.use(routerUtil);
    app.use(routerUsers);
    app.use(routerPosts);
    app.use(routerComment);
    app.use(routerEvents);
    app.use(routerReaction);

    app.use((err, req, res, next)=>{
        logger('error','SERVER',__filename,err.stack);
        next();
    });

    let servidor = http.createServer(app);
    servidor.listen( process.env.PORT , () => {
        logger('info','SERVER','APP.JS','Listening at port '+ process.env.PORT);
    })

}