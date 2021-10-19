import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));


const loadGoogleAnalytics = (config: { enabled: boolean; code: string }) =>
  new Promise<void>(
    (resolve, reject) => {
      if (config.enabled) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${config.code}`;
        script.onerror = () => {
          script.remove();
          reject('Google analytics failed to load');
        };
        document.head.appendChild(script);
      } else {
        console.warn('Google analytics disabled in this environment');
        resolve();
      }
    }
  );

loadGoogleAnalytics(environment.analytics.google)
  .catch(err => console.error(err));
