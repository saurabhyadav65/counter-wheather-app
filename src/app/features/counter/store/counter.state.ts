// src/app/features/counter/store/counter.state.ts
export interface CounterState {
  counters: number[];
}

export const initialState: CounterState = {
  counters: []
};
