import { Request, Response } from "express";
import Event from "../models/Event";
import mongoose from "mongoose";

interface CustomReq extends Request {
    uid?: string
}

export const getEvents = async (req: CustomReq, res: Response) => {

    const events = await Event.find()
        .populate('user', 'name')


    res.status(201).json({
        ok: true,
        msg: 'get events',
        events
    })
}

export const createEvent = async (req: CustomReq, res: Response) => {

    const event = new Event(req.body);

    try {

        event.user = new mongoose.Types.ObjectId(req.uid);

        const eventSaved = await event.save();
        res.status(201).json({
            ok: true,
            msg: 'saved event',
            event: eventSaved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

export const updateEvent = async (req: CustomReq, res: Response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not authorized to update this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}


export const deleteEvent = async (req: CustomReq, res: Response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'Event not found'
            })
        }

        if (event!.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'You are not authorized to delete this event'
            })
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: ' deleted event '
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error deleting event,please contact the administrator'
        })
    }
}
