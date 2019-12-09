import {Injectable} from '@angular/core';
import {NavigationEnd} from '@angular/router';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() {
    if (environment.analytics.google.enabled) {
      gtag('js', new Date());
      gtag('config', environment.analytics.google.code);
    }
  }

  emitNavigationEndEvent(navigationEnd: NavigationEnd) {
    if (environment.analytics.google.enabled) {
      gtag('config', environment.analytics.google.code, {page_path: navigationEnd.urlAfterRedirects});
    }
  }

  emitEvent(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    if (environment.analytics.google.enabled) {
      gtag(
        'event',
        eventName,
        {eventCategory, eventLabel, eventAction, eventValue}
      );
    }
  }

}
