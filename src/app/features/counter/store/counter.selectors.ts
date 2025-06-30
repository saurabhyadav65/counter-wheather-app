import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCounters = createSelector(
  selectCounterState,
  (state) => state.counters
);
