import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'counter', pathMatch: 'full' },
  {
    path: 'counter',
    loadComponent: () =>
      import('./features/counter/counter.component').then(m => m.CounterComponent)
  },
  {
    path: 'vatavaran',
    loadComponent: () =>
      import('./features/vatavaran/weather.component').then(m => m.WeatherComponent)
  }
];
