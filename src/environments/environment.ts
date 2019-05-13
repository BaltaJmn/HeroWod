// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  firebaseConfig: {
    apiKey: "AIzaSyDKP2YmOILSE1irhFNh-Xo2jgEUVWlgCC0",
    authDomain: "herowod-c44bb.firebaseapp.com",
    databaseURL: "https://herowod-c44bb.firebaseio.com",
    projectId: "herowod-c44bb",
    storageBucket: "",
    messagingSenderId: "732499509842",
    usuarios: "usuarios",
    grupos: "grupos",
    entrenamientos: "entrenamientos"
  },

  defaultAvatar: "assets/defaultProfile.jpg"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
