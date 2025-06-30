import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { WeatherState, initialWeatherState } from './weather.state';

export const weatherReducer = createReducer(
    initialWeatherState,
    on(WeatherActions.loadCitySuccess, (state, { cityData }) => {
        const cities = [cityData, ...state.cities.filter(c => c.id !== cityData.id)];
        return {
            ...state,
            cities: cities.slice(0, 8), // limit to 8
            error: null
        };
    }),
    on(WeatherActions.loadCityFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(WeatherActions.deleteCity, (state, { id }) => ({
        ...state,
        cities: state.cities.filter(c => c.id !== id)
    })),
    on(WeatherActions.clearCities, (state) => ({
        ...state,
        cities: []
    })),
    on(WeatherActions.selectCity, (state, { city }) => ({
        ...state,
        selectedCity: city
    })),

    on(WeatherActions.loadForecastSuccess, (state, { forecast }) => ({
        ...state,
        forecast
    })),
    on(WeatherActions.clearError, state => ({
        ...state,
        error: null
    }))

);
