import { provideStore } from '@ngrx/store';
import { counterReducer } from './features/counter/store/counter.reducer';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { weatherReducer } from './features/vatavaran/store/weather.reducer';
import { WeatherEffects } from './features/vatavaran/store/weather.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig = [
   provideRouter(routes),
  provideHttpClient(), // ✅ add this
  provideStore({ counter: counterReducer, weather: weatherReducer }),
  provideEffects([WeatherEffects]),
  provideStoreDevtools(),
  provideAnimations(),
   provideToastr(),
];