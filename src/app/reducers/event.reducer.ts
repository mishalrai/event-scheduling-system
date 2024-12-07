import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EventActions } from '../actions/event.actions';
import { Event } from '../type/interfaces/event.interface';

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

  on(EventActions.add, (state: State, payload: Event) => ({
    ...state,
    events: [...state.events, payload],
  })),

  on(EventActions.remove, (state: State, { id }) => ({
    ...state,
    events: state.events.filter((event) => event?.id === id),
  })),

  on(EventActions.update, (state: State, payload) => ({
    ...state,
    events: state.events.map((event: Event) =>
      event.id === payload.id ? payload : event
    ),
  }))
);

/**
 * Note:
 * Topic: How to use feature creator
 * Tutorial link: https://www.youtube.com/watch?v=bHw8SV4SNUU
 */
export const booksFeature = createFeature({
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
} = booksFeature;
