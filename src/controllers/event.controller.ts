import { Request, Response } from "express";
import moment from "moment-timezone";
import { Event, Participant } from "../models";
import { Op } from "sequelize";
import { timeLimit, eventLimit } from "../constants";
import { isRestrictedTimezone } from "../util";

interface ValidationError {
  field: string;
  validationError: string[];
}

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //Validate the payload
    const validateEvent = validateEventPayload(req);
    if (validateEvent.length) {
      res.status(422).json({
        status: "error",
        message: "validation error",
        data: validateEvent,
      });
      return;
    }

    const { title, description, startTime, endTime, timeZone, location } =
      req.body;

    // Check invalid timezone
    if (!moment.tz.zone(timeZone)) {
      res.status(400).json({
        status: "error",
        message: "Invalid timezone",
      });
      return;
    }

    const startUtcTime = moment.tz(startTime, timeZone).utc();
    const endUtcTime = moment.tz(endTime, timeZone).utc();

    // validate start and end time
    if (endUtcTime.isBefore(startUtcTime)) {
      res.status(400).json({
        status: "error",
        message: "End time must be after start time",
      });
      return;
    }

    // Check new event is conflict with existing event
    const conflictExist = await checkConflict(startUtcTime, endUtcTime);

    if (conflictExist) {
      res.status(409).json({
        status: "error",
        message: "Event time conflict with an existing event.",
      });
      return;
    }

    // Check Restriction timezone
    if (isRestrictedTimezone(timeZone)) {
      const time = moment().tz(timeZone).subtract(timeLimit, "day").utc();

      const eventCount = await Event.count({
        where: {
          created_at: { [Op.gt]: time },
        },
      });

      if (eventCount > eventLimit) {
        res.status(429).json({
          status: "error",
          message: `You have reached the limit of ${eventLimit} free events in ${timeLimit} days`,
        });
        return;
      }
    }

    const event = await Event.create({
      title,
      description,
      start_time: startUtcTime,
      end_time: endUtcTime,
      time_zone: timeZone,
      location,
    });

    res.status(201).json({
      status: "success",
      message: "successfully created",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating event",
      details: error,
    });
  }
};

export const getEventByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      res.status(404).json({
        status: "error",
        message: "Required field userId is missing from query param",
      });
      return;
    }

    const participants = await Participant.findAll({
      where: { id: +userId },
    });

    res.status(200).json({
      status: "success",
      message: "successfully retrieved",
      data: participants,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error on searching event",
      details: error,
    });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully.",
      data: events,
    });
  } catch (error) {
    res.status(403).json({
      status: "error",
      message: "failed to fetch events",
      details: error,
    });
  }
};

const validateEventPayload = (req: Request): ValidationError[] => {
  const { title, description, startTime, endTime, timeZone } = req.body;

  const validationErrors: ValidationError[] = [];

  // Helper function to add validation errors
  const addValidationError = (field: string, errors: string[]) => {
    validationErrors.push({ field, validationError: errors });
  };

  // Validate title
  if (!title) {
    addValidationError("title", [
      "required field",
      "Characters length should be 5-150",
    ]);
  } else if (title.length < 5 || title.length > 150) {
    addValidationError("title", ["Characters length should be 5-150"]);
  }

  // Validate description
  if (description && description.length > 500) {
    addValidationError("description", [
      "Characters length should be up to 500",
    ]);
  }

  // Validate startTime
  if (!startTime) {
    addValidationError("startTime", ["required field"]);
  }

  // Validate endTime
  if (!endTime) {
    addValidationError("endTime", ["required field"]);
  }

  // Validate timeZone
  if (!timeZone) {
    addValidationError("timeZone", ["required field"]);
  }

  return validationErrors;
};

const checkConflict = async (
  startTime: moment.Moment,
  endTime: moment.Moment
) => {
  const conflictingEvents = await Event.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            { start_time: { [Op.lt]: endTime } },
            { end_time: { [Op.gt]: startTime } },
          ],
        },
        {
          [Op.and]: [
            { start_time: { [Op.eq]: startTime } },
            { end_time: { [Op.eq]: endTime } },
          ],
        },
      ],
    },
  });
  return !!conflictingEvents.length;
};
