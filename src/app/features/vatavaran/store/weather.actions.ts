import { createAction, props } from '@ngrx/store';
import { WeatherData, WeatherForecast } from './weather.state';

export const loadCityWeather = createAction(
  '[Weather] Load City',
  props<{ city: string }>()
);

export const loadCitySuccess = createAction(
  '[Weather] Load City Success',
  props<{ cityData: WeatherData }>()
);

export const loadCityFailure = createAction(
  '[Weather] Load City Failure',
  props<{ error: string }>()
);

export const deleteCity = createAction(
  '[Weather] Delete City',
  props<{ id: number }>()
);

export const refreshCity = createAction(
  '[Weather] Refresh City',
  props<{ city: string }>()
);

export const clearCities = createAction('[Weather] Clear All');
export const clearError = createAction('[Weather] Clear Error');
export const selectCity = createAction(
  '[Weather] Select City',
  props<{ city: string }>()
);

export const loadForecastSuccess = createAction(
  '[Weather] Load Forecast Success',
  props<{ forecast: WeatherForecast[] }>()
);
