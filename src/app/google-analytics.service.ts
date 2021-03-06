import {ErrorHandler, Injectable} from '@angular/core';
import {NavigationEnd} from '@angular/router';
import {environment} from '../environments/environment';

/* eslint-disable @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match */
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() {
    if (environment.analytics.google.enabled) {
      gtag('js', new Date());
      gtag('config', environment.analytics.google.code);
      this.emitTimingMeasurement('app-init', 'Application Initialized', Math.round(performance.now()));
    }
  }

  emitNavigationEndEvent(navigationEnd: NavigationEnd) {
    if (environment.analytics.google.enabled) {
      gtag('config', environment.analytics.google.code, {page_path: navigationEnd.urlAfterRedirects});
    }
  }

  emitEvent(
    action: string,
    event_category: string,
    event_label: string = null,
    value: number = null
  ) {
    if (environment.analytics.google.enabled) {
      gtag('event', action, {event_category, event_label, value});
    }
  }

  emitTimingMeasurement(name: string, event_category: string, value: number) {
    if (environment.analytics.google.enabled) {
      gtag('event', 'timing_complete', {name, event_category, value});
    }
  }

}

@Injectable()
export class GoogleAnalyticsErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    let description = 'unknown';
    if (typeof error === 'string') {
      description = error;
    } else if (error.hasOwnProperty('message')) {
      description = error.message;
    }
    this.emitException(description, true);
  }

  private emitException(description: string, fatal: boolean = false) {
    if (environment.analytics.google.enabled) {
      gtag('event', 'exception', {description, fatal});
    }
  }

}
