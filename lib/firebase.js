import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC9igXdQNDyiVDMLt3o-_nXiR9fbX0Nffo",
  authDomain: "mba-webapp.firebaseapp.com",
  projectId: "mba-webapp",
  storageBucket: "mba-webapp.appspot.com",
  messagingSenderId: "195850235442",
  appId: "1:195850235442:web:25a7500cac71397dc0962b",
  measurementId: "G-CDQVWW1YF1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const { analytics } = firebase;

export { firebase, analytics };
