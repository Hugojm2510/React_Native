// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkVIaOJm6_lbNgpvdK6s5lGHlnY5YwCKQ",
  authDomain: "tarea-01-48430.firebaseapp.com",
  projectId: "tarea-01-48430",
  storageBucket: "tarea-01-48430.firebasestorage.app",
  messagingSenderId: "965547397777",
  appId: "1:965547397777:web:d8c5de5cac984597d1e530"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);