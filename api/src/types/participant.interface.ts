export enum RSVP_STATUS {
  ACCEPTED = "accepted",
  DECLINED = "declined",
  PENDING = "pending",
}

export interface Participant {
  id: number;
  eventId: number;
  name: string;
  email: string;
  rsvpStatus: RSVP_STATUS;
  created_at: Date;
  updated_at: Date;
}
