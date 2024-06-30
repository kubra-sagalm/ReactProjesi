import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"; // Firebase Authentication modülünü import ediyoruz

const firebaseConfig = {
  apiKey: "AIzaSyD0hRftR8-OMW8f-PEh5XyHlgVBvWtzub0",
  authDomain: "todolist-be725.firebaseapp.com",
  projectId: "todolist-be725",
  storageBucket: "todolist-be725.appspot.com",
  messagingSenderId: "994567559340",
  appId: "1:994567559340:web:2070763b305e9ab463a709",
  measurementId: "G-D1LFJR90WV",
};

// Firebase'i başlat
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Firestore ve Auth örneklerini al
const firestore = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { firestore, auth };




