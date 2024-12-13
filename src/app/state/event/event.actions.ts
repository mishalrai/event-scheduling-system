import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Event } from '../../type/interfaces/event.interface';

export const EventActions = createActionGroup({
  source: 'Events Page',
  events: {
    'Event Added': props<Event>(),
    'Event Removed': props<{ id: number }>(),
    'Event Updated': props<Event>(),
  },
});

export const EventApiActions = createActionGroup({
  source: 'Event API',
  events: {
    'Events Fetching': emptyProps(),
    'Events Loadded Success': props<{ events: Array<Event> }>(),
    'Events Loadded Failure': props<{ error: string }>(),

    'Event Added Success': props<{ event: Event }>(),
    'Event Added Failure': props<{ error: string }>(),
    'Event Added Failure Message': (error: string) => ({ error }),
  },
});
