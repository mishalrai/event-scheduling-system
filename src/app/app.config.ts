import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { eventFeature } from './state/event/event.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseurlInterceptor } from './interceptors/baseurl.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([baseurlInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(eventFeature), //To support create feature
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
