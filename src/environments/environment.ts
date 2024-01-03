// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'assets/js/data.json',
  // baseApiUrl: 'http://172.16.10.144:8762/', // serve url
  baseApiUrl: 'http://172.16.10.63:8762/', //local url

  apikey: {
    loginapikey: "ef17699fba61db57752203c42f448a9dea5325921819c69f12500434505dc68e7cf"
  },
  firebase: {
    apiKey: "AIzaSyAMg2kFPvOzll95TjdrtmH-ukN25fjA7es",
    authDomain: "hsm-uat.firebaseapp.com",
    projectId: "hsm-uat",
    storageBucket: "hsm-uat.appspot.com",
    messagingSenderId: "412775226235",
    appId: "1:412775226235:web:bfa242bddb7779446d7bde",
    measurementId: "G-FKRKER5K2V",
    vapidKey: "BLQcFVzpZMYhXp0feR3a8VWqpVQe1JQMNB6uChkXFeeylGymvd5rFXNpFuFHmWyatmgfMuqqEf53ajBHUhCtIEc"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
