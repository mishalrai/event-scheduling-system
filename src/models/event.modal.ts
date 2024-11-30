import client from "../config/database";

export const getAllEventsService = async () => {
  const result = await client.query("SELECT * from events");
  return result.rows;
};

export const createEventServices = async (
  title: string,
  description: string,
  startTime: string,
  endTime: string,
  timeZone: string,
  location: string
) => {
  const result = await client.query(
    "INSERT INTO events (title, description, start_time, end_time, time_zone, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, description, startTime, endTime, timeZone, location]
  );
  return result.rows[0];
};
