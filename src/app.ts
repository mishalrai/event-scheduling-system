import express, { Express } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import { eventRouter } from "./routes/event.routes";

//Database connection module
import "./config/database";
import { participantRouter } from "./routes/participant.routes";

dotenv.config();

const app: Express = express();
const port: number = (process.env.PORT || 3000) as number;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//API routes
app.use("/api/events", eventRouter);
app.use("/api/participants", participantRouter);

const server = app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error}`);
  server.close(() => process.exit(1));
});
