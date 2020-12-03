import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyACFnCPoHYyMHPkbzn_pfbhOeGEiQ8yd4o",
    authDomain: "shreersc-dev.firebaseapp.com",
    projectId: "shreersc-dev",
    appID: "1:140762334694:web:c388adc984c3e918cb4227",
    databaseURL: "https://shreersc-dev.firebaseio.com",
  });

  //   firebase.auth().settings.appVerificationDisabledForTesting = true;
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
}

export default firebase;
