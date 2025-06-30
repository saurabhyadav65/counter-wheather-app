import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WeatherActions from './weather.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class WeatherEffects {
     private toastr = inject(ToastrService);
    private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';

    constructor(private actions$: Actions, private http: HttpClient) { }

loadCity$ = createEffect(() =>
  this.actions$.pipe(
    ofType(WeatherActions.loadCityWeather, WeatherActions.refreshCity),
    mergeMap(({ city }) =>
      this.http
        .get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .pipe(
          map((res) => {
            this.toastr.success(`${res.name} added successfully`, 'Success'); // ✅ success toast here

            return WeatherActions.loadCitySuccess({
              cityData: {
                id: res.id,
                name: res.name,
                temp: Math.round(res.main.temp),
                icon: res.weather[0].icon
              }
            });
          }),
          catchError(() =>
            of(WeatherActions.loadCityFailure({ error: 'Invalid city name' }))
          )
        )
    )
  )
);
    loadForecast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.selectCity),
            mergeMap(({ city }) =>
                this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`)
                    .pipe(
                        map(res => {
                            const uniqueDays = new Map<string, any>();

                            for (const entry of res.list) {
                                const dateKey = dayjs(entry.dt_txt).format('YYYY-MM-DD');
                                if (!uniqueDays.has(dateKey)) {
                                    uniqueDays.set(dateKey, {
                                        date: entry.dt_txt,
                                        day: dayjs(entry.dt_txt).format('ddd'),
                                        temp: Math.round(entry.main.temp),
                                        icon: entry.weather[0].icon,
                                        wind: entry.wind.speed,
                                        pressure: entry.main.pressure,
                                        description: entry.weather[0].description
                                    });
                                }

                                if (uniqueDays.size === 5) break;
                            }

                            const forecast = Array.from(uniqueDays.values());

                            return WeatherActions.loadForecastSuccess({ forecast });
                        }),
                        catchError(() => of(WeatherActions.loadCityFailure({ error: 'Forecast failed' })))
                    )
            )
        )
    );





}
