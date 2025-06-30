import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import { CounterState, initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.addCounter, (state) => ({
    ...state,
    counters: [...state.counters, 0]
  })),
  on(CounterActions.removeCounter, (state, { index }) => ({
    ...state,
    counters: state.counters.filter((_, i) => i !== index)
  })),
  on(CounterActions.incrementCounter, (state, { index }) => ({
    ...state,
    counters: state.counters.map((val, i) => (i === index ? val + 1 : val))
  })),
  on(CounterActions.decrementCounter, (state, { index }) => ({
    ...state,
    counters: state.counters.map((val, i) => (i === index ? val - 1 : val))
  })),
  on(CounterActions.resetCounters, () => ({
    counters: []
  }))
);
