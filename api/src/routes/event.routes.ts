import express, { NextFunction, Request, Response, Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventsByUserId,
  updateEvent,
} from "../controllers/event.controller";

export const eventRouter: Router = express.Router();

eventRouter.route("/").get(getAllEvents).post(createEvent);
eventRouter.route("/:id").delete(deleteEvent).put(updateEvent);
eventRouter.route("/search").get(getEventsByUserId);
