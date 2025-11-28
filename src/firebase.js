// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF_Mq2QJcJelv-K9wud-3u1T1qd51AAvk",
  authDomain: "food-rescue-8a4f2.firebaseapp.com",
  databaseURL: "https://food-rescue-8a4f2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-rescue-8a4f2",
  storageBucket: "food-rescue-8a4f2.firebasestorage.app",
  messagingSenderId: "477182036178",
  appId: "1:477182036178:web:210246039d25730209450b",
  measurementId: "G-27858GZLCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);