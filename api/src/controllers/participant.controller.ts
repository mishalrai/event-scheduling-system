import { Request, Response } from "express";
import { Participant, Event } from "../models";
import { isEventIdExist, isEmailInUse, isUserIdExist } from "./util.controler";
import { filterAllowedPayload, isValidEmail } from "../util";
import { participantKeyMapping } from "../constants";

export const getAllParticipants = async (req: Request, res: Response) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully.",
      data: participants,
    });
  } catch (error) {
    res.status(403).json({
      status: "error",
      message: "failed to fetch",
      details: error,
    });
  }
};

export const addParticipant = async (req: Request, res: Response) => {
  const { eventId, name, email, rsvpStatus } = req.body;
  try {
    const isEventExist = await isEventIdExist(+eventId);
    if (!isEventExist) {
      res.status(422).json({
        status: "error",
        message: "Event doesn't exist",
      });
      return;
    }

    const isEmailExist = await isEmailInUse(email);
    if (isEmailExist) {
      res.status(422).json({
        status: "error",
        message: "The email address is already in use.",
      });
      return;
    }

    if (email && !isValidEmail(email)) {
      res.status(422).json({
        status: "error",
        message: "validation error",
        data: [
          {
            field: "email",
            validationError: "invalid email",
          },
        ],
      });
      return;
    }

    const participant = await Participant.create({
      event_id: eventId,
      name,
      email,
      rsvp_status: rsvpStatus,
    });

    res.status(201).json({
      status: "success",
      message: "Successfully added participant in event",
      data: participant,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error adding participant",
      details: error,
    });
  }
};

export const updateParticipant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        status: "error",
        message: "id is required to update",
      });
      return;
    }
    const isUserExist = await isUserIdExist(+id);
    if (!isUserExist) {
      res.status(422).json({
        status: "error",
        message: "User doesn't exist",
      });
      return;
    }

    const payload = filterAllowedPayload(req.body, participantKeyMapping);
    const updatedParticipant = await Participant.update(payload, {
      where: { id: +id },
      returning: true,
    });
    res.status(200).json({
      status: "success",
      message: "updated successfully",
      data: updatedParticipant[1],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to participant",
      details: error,
    });
  }
};

export const getParticipantsByEventId = async (req: Request, res: Response) => {
  try {
    const eventId = req.query.eventId;

    if (!eventId) {
      res.status(404).json({
        status: "error",
        message: "Required field eventId is missing from query param",
      });
      return;
    }

    const participants = await Participant.findAll({
      where: { event_id: +eventId },
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

export const deleteParticipant = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        status: "error",
        message: "id is required to update",
      });
      return;
    }
    const result = await Participant.destroy({
      where: { id: +id },
    });
    if (result !== 0) {
      res.status(200).json({
        status: "success",
        message: "deleted successfully",
      });
      return;
    }
    throw "provided id is not found";
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete",
      details: error,
    });
  }
};
