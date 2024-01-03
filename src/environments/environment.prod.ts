export const environment = {
  production: true,
  baseUrl:'assets/js/data.json',
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

///////////////////////

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLx-tHGqoIvvL74j34sxKYJSicJqzWI7k",
  authDomain: "cgs-webportal.firebaseapp.com",
  projectId: "cgs-webportal",
  storageBucket: "cgs-webportal.appspot.com",
  messagingSenderId: "903846900202",
  appId: "1:903846900202:web:fb7295c31ce20953134293",
  measurementId: "G-SLHGWWGFDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
