export interface Event {
  id: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  createdAt?: string;
  updatedAt?: string;
}
export type EventAddPayload = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

export type EventUpdatePayload = Partial<Event>;
