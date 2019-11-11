import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {hasOwnProperty} from 'tslint/lib/utils';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

loadGoogleAnalytics(environment.analytics.google)
  .catch(err => console.error(err));

/* tslint:disable:no-string-literal */
function loadGoogleAnalytics(config: { enabled: boolean, code: string }) {
  return new Promise(((resolve, reject) => {
    if (config.enabled) {
      const script = document.createElement('script');
      script.async = true;
      script.type = 'text/javascript';
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.code}`;
      script.onload = () => {
        window['dataLayer'] = window['dataLayer'] || [];
        const gtag = (...args: any[]) => window['dataLayer'].push(args);
        gtag('js', new Date());
        gtag('config', config.code);
        resolve();
      };
      script.onerror = () => {
        script.remove();
        reject('Google analytics failed to load');
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      console.warn('Google analytics disabled in this environment');
      resolve();
    }
  }));
}
/* tslint:enable:no-string-literal */
