import { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";
import {
  getAllEventsService,
  createEventServices,
} from "../models/event.modal";

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const events = await getAllEventsService();
  res.status(200).json({
    status: "success",
    message: "Data retrieved successfully.",
    data: events,
  });
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;

    if (!title) {
      throw "title not found";
    }

    const event = await createEventServices(
      title,
      "description",
      "2024-11-30T14:15:22Z",
      "2024-12-30T14:15:22Z",
      "asia",
      "nepal"
    );
    res.status(200).json({
      status: "success",
      message: "Successfully created event",
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({
      success: false,
      message: "failed :( ",
      error: error,
    });
  }
};

// export const createEvent = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { title, description, start_time, end_time, time_zone, location } =
//       req.body;

//     if (!moment.tz.zone(time_zone)) {
//       return res.status(400).json({ error: "Invalid timezone" });
//     }

//     const startTime = moment.tz(start_time, time_zone).utc();
//     const endTime = moment.tz(end_time, time_zone).utc();

//     if (endTime.isBefore(startTime)) {
//       return res
//         .status(400)
//         .json({ error: "End time must be after start time" });
//     }

//     // const event = await Event.create({ title, description, start_time: startTime, end_time: endTime, time_zone, location });
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ error: "Error creating event", details: error });
//   }
// };
