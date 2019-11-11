export class Util {

  /**
   * Google analytics tag
   */
  static gtag(...args: any[]) {
    /* tslint:disable:no-string-literal */
    if (window.hasOwnProperty('dataLayer')) {
      window['dataLayer'].push(args);
    }
    /* tslint:enable:no-string-literal */
  }

}
