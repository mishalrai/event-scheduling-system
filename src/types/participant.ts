export enum  RSVP_STATUS{
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    PENDING = 'pending'
}

export interface ParticipantAttributes {
  id: number;
  event_id: number;
  name: string;
  email: string;
  rsvp_status: RSVP_STATUS;
  created_at: Date;
  updated_at: Date;
}