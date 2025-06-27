// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAAr3zJl1OMAcOHBNcf5Tg4k2N0sRkEbFw",
  authDomain: "groccery-app-c965f.firebaseapp.com",
  projectId: "groccery-app-c965f",
  storageBucket: "groccery-app-c965f.firebasestorage.app",
  messagingSenderId: "372389950270",
  appId: "1:372389950270:web:e0f9501eeb045bff74b26f",
  measurementId: "G-MC7YVRFN3G"
};

const app = initializeApp(firebaseConfig);

export { app };
