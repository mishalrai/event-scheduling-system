import express, { NextFunction, Request, Response, Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventByUserId,
} from "../controllers/event.controller";

export const eventRouter: Router = express.Router();

eventRouter.route("/").get(getAllEvents).post(createEvent);

eventRouter.route("/search").get(getEventByUserId);
