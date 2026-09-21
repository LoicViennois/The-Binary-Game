import { isDevMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';

platformBrowser().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .then(() => {
    if ('serviceWorker' in navigator && !isDevMode()) {
      navigator.serviceWorker.register('./ngsw-worker.js').then();
    }
  })
  .catch(err => console.log(err));
