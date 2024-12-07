import { createAction, createActionGroup, props } from '@ngrx/store';
import { Event } from '../type/interfaces/event.interface';

export const EventActions = createActionGroup({
  source: 'Events',
  events: {
    add: props<Event>(),
    remove: props<{ id: number }>(),
    update: props<Event>(),
  },
});

export const EventsApiActions = createActionGroup({
  source: 'Event API',
  events: {
    retrievedEvents: props<{
      events: Array<Event>;
    }>(),
  },
});
