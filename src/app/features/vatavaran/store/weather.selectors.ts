import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectWeatherCities = createSelector(
  selectWeatherState,
  (state) => state.cities
);

export const selectWeatherError = createSelector(
  selectWeatherState,
  (state) => state.error
);
export const selectWeatherForecast = createSelector(
  selectWeatherState,
  (state) => state.forecast
);
