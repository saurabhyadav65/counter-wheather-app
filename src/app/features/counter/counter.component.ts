import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CounterActions from './store/counter.actions';
import { selectCounters } from './store/counter.selectors';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  counters$ = this.store.select(selectCounters);

  constructor(private store: Store) {}

  addCounter() {
    this.store.dispatch(CounterActions.addCounter());
  }

  remove(index: number) {
    this.store.dispatch(CounterActions.removeCounter({ index }));
  }

  inc(index: number) {
    this.store.dispatch(CounterActions.incrementCounter({ index }));
  }

  dec(index: number) {
    this.store.dispatch(CounterActions.decrementCounter({ index }));
  }

  reset() {
    this.store.dispatch(CounterActions.resetCounters());
  }
}