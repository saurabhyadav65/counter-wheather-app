export interface WeatherForecast {
  date: string;
  day: string;
  temp: number;
  icon: string;
  wind: number;
  pressure: number;
  description: string;
}

export interface WeatherData {
  name: string;
  temp: number;
  icon: string;
  id: number;
}

export interface WeatherState {
  cities: WeatherData[];
  error: string | null;
  selectedCity: string | null;
  forecast: WeatherForecast[];
}

export const initialWeatherState: WeatherState = {
  cities: [],
  error: null,
  selectedCity: null,
  forecast: []
};
