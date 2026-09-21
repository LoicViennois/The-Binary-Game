import { isDevMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .then(() => {
    if ('serviceWorker' in navigator && !isDevMode()) {
      navigator.serviceWorker.register('./ngsw-worker.js').then();
    }
  })
  .catch(err => console.log(err));
