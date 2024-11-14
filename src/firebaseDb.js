import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-lRY1OFA7BCJtPxFRPBouj21sN8P5QhU",
  authDomain: "subscriptions-cc5e4.firebaseapp.com",
  projectId: "subscriptions-cc5e4",
  storageBucket: "subscriptions-cc5e4.firebasestorage.app",
  messagingSenderId: "899939611303",
  appId: "1:899939611303:web:0578748c9aaa968f612182"
};

// Initialize Firebase app and Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db;
