// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDJMtVgipeCZokf-xwEVP36xiQnWHwJ1tk",
  authDomain: "assignment-redux-crud.firebaseapp.com",
  projectId: "assignment-redux-crud",
  storageBucket: "assignment-redux-crud.appspot.com",
  messagingSenderId: "883996099169",
  appId: "1:883996099169:web:d8162a0b2c56650e6ee020",
  measurementId: "G-RY0EKWMJR0",
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
export const db = getFirestore();
export const auth = getAuth();
