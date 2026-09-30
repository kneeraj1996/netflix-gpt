// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEzVCQrifZaVfGF8vYZD_4jypI1op0Sc8",
  authDomain: "netflixgpt-dea6b.firebaseapp.com",
  projectId: "netflixgpt-dea6b",
  storageBucket: "netflixgpt-dea6b.firebasestorage.app",
  messagingSenderId: "534406401532",
  appId: "1:534406401532:web:86ed454476d482b09fb679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();