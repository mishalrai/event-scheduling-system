import express, { Router } from 'express';
import { createEvent } from '../controllers/event.controller';


const eventRouter: Router = express.Router();

eventRouter
    .route("/")
    .post(createEvent);

eventRouter
    .route("/:id")
    .get(getEvent);