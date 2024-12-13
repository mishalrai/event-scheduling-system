export interface Event {
  id: number;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  time_zone: string;
  createdAt?: string;
  updatedAt?: string;
}
export type EventAddPayload = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

export type EventUpdatePayload = Partial<Event>;
