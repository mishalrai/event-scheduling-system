import express, { NextFunction, Request, Response, Router } from "express";
import { createEvent, getAllEvents } from "../controllers/event.controller";

export const eventRouter: Router = express.Router();

eventRouter.route("/").get(getAllEvents).post(createEvent);

//     .post(createEvent);

// eventRouter
//     .route("/:id")
//     .get(getEvent);
