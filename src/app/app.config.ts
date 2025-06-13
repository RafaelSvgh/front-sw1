import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { authInterceptor } from './interceptors/auth.interceptor';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://back-sw1.onrender.com', options: {} };
// https://back-sw1.onrender.com/
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(), //global
      withInterceptors([authInterceptor])
    ),
    ApiService,
    {
      provide: SocketIoModule,
      useFactory: () => SocketIoModule.forRoot(config),
    },
  ]
};
