import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EventActions, EventApiActions } from './event.actions';
import { Event } from '../../type/interfaces/event.interface';

interface State {
  events: Array<Event>;
  isLoading: boolean;
  selectedId: number | null;
}

export const initialState: State = {
  events: [],
  isLoading: false,
  selectedId: null,
};

const eventReducer = createReducer(
  initialState,

  // Event page action
  on(EventActions.eventAdded, (state: State, payload: Event) => ({
    ...state,
    events: [...state.events, payload],
  })),

  on(EventActions.eventRemoved, (state: State, { id }) => ({
    ...state,
    events: state.events.filter((event) => event?.id === id),
  })),

  on(EventActions.eventUpdated, (state: State, payload) => ({
    ...state,
    events: state.events.map((event: Event) =>
      event.id === payload.id ? payload : event
    ),
  })),

  // API Action
  on(EventApiActions.eventsLoaddedSuccess, (state: State, { events }) => ({
    ...state,
    events,
    isLoading: false,
  })),

  on(EventApiActions.eventsFetching, (state: State) => ({
    ...state,
    isLoading: true,
  }))
);

/**
 * Note:
 * Topic: How to use feature creator
 * Tutorial link: https://www.youtube.com/watch?v=bHw8SV4SNUU
 */
export const eventFeature = createFeature({
  name: 'event',
  reducer: eventReducer,
  extraSelectors: ({ selectSelectedId, selectEvents }) => ({
    selectSelectedEvent: createSelector(
      selectSelectedId,
      selectEvents,
      (selectedId, events) =>
        events.find((event: Event) => event.id === selectedId)
    ),
  }),
});

export const {
  name, // Feature name
  reducer, // Feature Reducer
  selectEventState, // Feature selector
  selectSelectedId, // Selector for `selecedtId` property
  selectEvents, // Selector for `events` property
  selectIsLoading, // Selector for `isLoading` property
  selectSelectedEvent, // Compute the selected event detail using selectSelectedId and selectEvents selector
} = eventFeature;
