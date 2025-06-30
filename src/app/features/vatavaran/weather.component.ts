import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as WeatherActions from './store/weather.actions';
import { selectWeatherCities, selectWeatherError } from './store/weather.selectors';
import { selectWeatherForecast } from './store/weather.selectors';
import { WeatherForecast } from './store/weather.state';
import { Observable, take, tap } from 'rxjs';
import dayjs from 'dayjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  cityInput = '';
  cities$ = this.store.select(selectWeatherCities);
  // error$ = this.store.select(selectWeatherError);
  dayjs = dayjs;
  selectedCity: string | null = null;
  // forecast$ = this.store.select(selectWeatherForecast);
  selectedDayIndex = 0;
  getAmChartsIcon(code: string): string {
    const map: { [key: string]: string } = {
      '01d': 'day',
      '01n': 'night',
      '02d': 'cloudy-day-1',
      '02n': 'cloudy-night-1',
      '03d': 'cloudy',
      '03n': 'cloudy',
      '04d': 'cloudy',
      '04n': 'cloudy',
      '09d': 'rainy-4',
      '09n': 'rainy-4',
      '10d': 'rainy-1',
      '10n': 'rainy-4',
      '11d': 'thunder',
      '11n': 'thunder',
      '13d': 'snowy-1',
      '13n': 'snowy-1',
      '50d': 'cloudy',
      '50n': 'cloudy'
    };
    return map[code] || 'cloudy';
  }

  selectedDay: WeatherForecast | null = null;

  constructor(private store: Store, private toastr: ToastrService) {
    this.store.select(selectWeatherError).subscribe(error => {
      if (error) {
        this.toastr.error(error, 'Error');
        this.store.dispatch(WeatherActions.clearError());
      }
    });
  }

  addCity() {
    if (this.cityInput.trim()) {
      this.store.dispatch(WeatherActions.loadCityWeather({ city: this.cityInput.trim() }));
      this.cityInput = '';
    }
  }


  deleteCity(id: number) {
    this.cities$.pipe(take(1)).subscribe(cities => {
      const cityToDelete = cities.find(c => c.id === id);

      if (cityToDelete?.name === this.selectedCity) {
        this.selectedCity = null;
        this.selectedDay = null;
        this.store.dispatch(WeatherActions.loadForecastSuccess({ forecast: [] }));
      }

      this.store.dispatch(WeatherActions.deleteCity({ id }));
    });
  }

  refresh(city: string) {
    this.store.dispatch(WeatherActions.refreshCity({ city }));
  }

  clearAll() {
    this.store.dispatch(WeatherActions.clearCities());
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.selectedDayIndex = 0;
    this.store.dispatch(WeatherActions.selectCity({ city }));
  }

  forecast$: Observable<WeatherForecast[]> = this.store.select(selectWeatherForecast).pipe(
    tap(forecast => {
      this.selectedDay = forecast[this.selectedDayIndex];
      this.selectedDayIndex = 0;
    })
  );

  selectDay(i: number, forecast: WeatherForecast[]) {
    this.selectedDayIndex = i;
    this.selectedDay = forecast[i];
  }

}
