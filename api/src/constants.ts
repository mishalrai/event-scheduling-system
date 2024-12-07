export const restrictedTimezone: Array<string> = ["Asia/Tokyo"];
export const eventLimit: number = 3;
export const timeLimit: number = 7;

export const participantKeyMapping: Record<string, string> = {
  eventId: "event_id",
  name: "name",
  email: "email",
  rsvpStatus: "rsvp_status",
};
export const eventKeyMapping: Record<string, string> = {
  title: "title",
  description: "description",
  timeZone: "time_zone",
  startTime: "start_time",
  endTime: "end_time",
  location: "location",
};
