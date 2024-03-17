import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { provideHttpClient } from '@angular/common/http';





export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
      // and returns simulated server responses.
      // Remove it when a real server is ready to receive requests.
      HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
      )

    ),
    provideRouter(routes)]
};
