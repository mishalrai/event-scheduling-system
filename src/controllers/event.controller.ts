
import { Request, Response } from 'express';
import moment from 'moment-timezone';

export const createEvent =  async ( req: Request, res: Response) =>{

    try {
        const { title, description, start_time, end_time, time_zone, location } = req.body;

        if (!moment.tz.zone(time_zone)) {
        return res.status(400).json({ error: 'Invalid timezone' });
        }

        const startTime = moment.tz(start_time, time_zone).utc();
        const endTime = moment.tz(end_time, time_zone).utc();

        if (endTime.isBefore(startTime)) {
        return res.status(400).json({ error: 'End time must be after start time' });
        }

        const event = await Event.create({ title, description, start_time: startTime, end_time: endTime, time_zone, location });
        res.status(201).json(event);

    }catch( error ){
        res.status(500).json({ error: 'Error creating event', details: error.message });
    }

}