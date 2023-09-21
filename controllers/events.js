const { response } = require('express');
const Event = require('../models/event');

const getEvents = async ( req, res = response ) => {

    const events = await Event.find()
                                .populate('user','name')


    res.status(201).json({
        ok:true,
        msg:'get events',
        events
    })
}

const createEvent = async ( req, res = response ) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventSaved = await event.save();
        res.status(201).json({
            ok:true,
            msg:'saved event',
            event: eventSaved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Please contact the administrator'       
        })
    }
}

const updateEvent = async ( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventId);

        if ( !event ) {
            return res.status(404).json({
                ok:false,
                msg:'Event not found'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg:'You are not authorized to update this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new:true  } );

        res.json({
            ok:true,
            event: eventUpdated
        })      
    
    }     catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Please contact the administrator'
        })
    }
}


const deleteEvent = async ( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if ( !event ) {
            return res.status(404).json({
                ok:false,
                msg:'Event not found'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok:false,
                msg:'You are not authorized to delete this event'
            })
        }

        await Event.findByIdAndDelete( eventId );

        res.json({
            ok:true,
            msg:' deleted event '
        }) 

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error deleting event,please contact the administrator'
        })
    }


    
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}