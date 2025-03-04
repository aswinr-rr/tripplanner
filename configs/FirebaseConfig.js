// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqzvjxsYE08z6ML8AcnU_ZsJyv1cLKr0A",
  authDomain: "tripplanner-798a2.firebaseapp.com",
  projectId: "tripplanner-798a2",
  storageBucket: "tripplanner-798a2.firebasestorage.app",
  messagingSenderId: "931064527584",
  appId: "1:931064527584:web:6f8f293a10270f85d8ae85",
  measurementId: "G-ZW7DP2PLP4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);