let express = require('express');
let router = express.Router();
let eventsManager = require('../managers/Events');
let mongoose = require('mongoose')

//====================================//
//             Events API              //
//====================================//

/**
 * Register a new Events
 */
router.get('/events',(req ,res)=>{
    eventsManager.getAllEvents()
    .then(( events )=>{
        return res.status(200).json( events );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});

/**
 *  Create a Events
 */
router.post('/events', ( req , res )=>{
    let events = req.body;
    eventsManager.createNewEvents(events)
    .then(( events )=>{
        return res.status(200).json( events );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    }) 
})

/**
 * Delete a Events
 */
router.delete('/events/:id', ( req , res )=>{
    let id = req.params.id;
    eventsManager.deleteEvents(id)
    .then(( events )=>{
        return res.status(200).json( events );
    })
    .catch( error =>{
        return res.status(400).end("Bad Request");
    })
});
/**
 * Modify a Events
 */
router.put('/events/:id', (req ,res )=>{
    let events = req.body;
    events._id = req.params.id;
    eventsManager.modifyEvents(events)
    .then(( events )=>{
        return res.status(200).json( events );
    })
    .catch( error =>{
        if( error instanceof mongoose.Error){
            return res.status(400).end("Bad Request");
        }
        return res.status(500).end("Internal Server Error");
    })
});

exports.eventsRouter = router;