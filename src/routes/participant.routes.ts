import express from "express";
import { Router } from "express";
import {
  addParticipant,
  getAllParticipants,
  updateParticipant,
  getParticipantsByEventId,
  deleteParticipant,
} from "../controllers/participant.controller";

export const participantRouter: Router = express.Router();
participantRouter.route("/").get(getAllParticipants).post(addParticipant);
participantRouter
  .route("/:id")
  .delete(deleteParticipant)
  .put(updateParticipant);
participantRouter.route("/search").get(getParticipantsByEventId);
