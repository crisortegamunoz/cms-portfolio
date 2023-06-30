// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'cms-portfolio-firebase',
    appId: '1:479681206382:web:8defe926891c2858026e7f',
    storageBucket: 'cms-portfolio-firebase.appspot.com',
    apiKey: 'AIzaSyCHorP1Kt1HQis7bsMro5qkggmSp_TWzSM',
    authDomain: 'cms-portfolio-firebase.firebaseapp.com',
    messagingSenderId: '479681206382',
  },
  production: false,
  apiUrl: 'http://localhost:4200',
  PORTFOLIO_API: 'http://localhost:8080/api/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
