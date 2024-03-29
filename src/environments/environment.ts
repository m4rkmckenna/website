// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  links: {
    github: 'https://github.com/m4rkmckenna',
    twitter: 'https://twitter.com/m4rkmckenna',
    linkedin: 'https://linkedin.com/in/m4rkmckenna',
  },
  analytics: {
    google: {enabled: false, code: 'UA-151915787-2'}
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
