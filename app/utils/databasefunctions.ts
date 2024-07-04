import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInWithRedirect } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCVZcN1p21TgNA-jSx9x7qhCAmwf8Sei8E",
    authDomain: "me2-web-app.firebaseapp.com",
    projectId: "me2-web-app",
    storageBucket: "me2-web-app.appspot.com",
    messagingSenderId: "100835264460",
    appId: "1:100835264460:web:6af0681fa12e244fca3f69",
    measurementId: "G-L2NXZ8F0B2",
  };

  const app = initializeApp(firebaseConfig);
  return app;
}

export const getUserAuth = (alreadyInit: boolean) => {
  if (!alreadyInit) {
    const app = initializeFirebase();
  }
  const auth = getAuth();
  return auth;
}

export const getFireStore = (alreadyInit: boolean) => {
  if (!alreadyInit) {
    const app = initializeFirebase();
  }
  const firestore = getFirestore();
  return firestore;
}

export const signIn = () => {
  const auth = getUserAuth(false);
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

export const signOut = () => {
  const auth = getUserAuth(false);
  auth.signOut();
}