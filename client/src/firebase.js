// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ccc8a.firebaseapp.com",
  projectId: "mern-estate-ccc8a",
  storageBucket: "mern-estate-ccc8a.appspot.com",
  messagingSenderId: "1094313480329",
  appId: "1:1094313480329:web:655f1160940ab761a5f658"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);