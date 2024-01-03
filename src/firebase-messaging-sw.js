// importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");


// firebase.initializeApp({
//   apiKey: "AIzaSyAMg2kFPvOzll95TjdrtmH-ukN25fjA7es",
//   authDomain: "hsm-uat.firebaseapp.com",
//   projectId: "hsm-uat",
//   storageBucket: "hsm-uat.appspot.com",
//   messagingSenderId: "412775226235",
//   appId: "1:412775226235:web:bfa242bddb7779446d7bde",
//   measurementId: "G-FKRKER5K2V"
// });

// //---> below that code as follow of doc 


// // const app = initializeApp(firebaseConfig);
// // const messaging = getMessaging(app);

// // messaging.onBackgroundMessage((payload) => {
// //   console.log('Background Message received. ', payload);
// //   // Handle the background message here
// // });

// //------->below that funtion or method follow by Handle Initialization in a Promise method of firebase:

// const initializeFirebaseMessaging = async () => {
//   return new Promise((resolve, reject) => {
//     const app = initializeApp(firebaseConfig);
//     const messaging = getMessaging(app);

//     // Check if messaging is available
//     if (messaging) {
//       resolve(messaging);
//     } else {
//       reject(new Error('Firebase messaging initialization failed.'));
//     }
//   });
// };

// // Usage example
// initializeFirebaseMessaging()
//   .then((messaging) => {
//     // Now you can use `messaging` for sending/receiving messages
//     console.log('Firebase messaging initialized successfully.');
    
//     // Example: Listen for messages
//     messaging.onMessage((payload) => {
//       console.log('Foreground Message received. ', payload);
//       // Handle foreground message here
//     });
//   })
//   .catch((error) => {
//     console.error('Error initializing Firebase messaging:', error);
//   });
  


importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAMg2kFPvOzll95TjdrtmH-ukN25fjA7es",
  authDomain: "hsm-uat.firebaseapp.com",
  projectId: "hsm-uat",
  storageBucket: "hsm-uat.appspot.com",
  messagingSenderId: "412775226235",
  appId: "1:412775226235:web:bfa242bddb7779446d7bde",
  measurementId: "G-FKRKER5K2V"
});

// Initialize messaging once
const messaging = firebase.messaging();

const initializeFirebaseMessaging = async () => {
  return new Promise((resolve, reject) => {
    // Check if messaging is available
    if (messaging) {
      resolve(messaging);
    } else {
      reject(new Error('Firebase messaging initialization failed.'));
    }
  });
};

// Usage example
initializeFirebaseMessaging()
  .then((messaging) => {
    // Now you can use `messaging` for sending/receiving messages
    console.log('Firebase messaging initialized successfully.');
    
    // Example: Listen for messages
    messaging.onMessage((payload) => {
      console.log('Foreground Message received. ', payload);
      // Handle foreground message here
    });
  })
  .catch((error) => {
    console.error('Error initializing Firebase messaging:', error);
  });
