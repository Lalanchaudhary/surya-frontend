// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqgnUE0ao61WOQ23nRSebudjMuOSSG-Ok",
  authDomain: "suryacake-e309f.firebaseapp.com",
  projectId: "suryacake-e309f",
  storageBucket: "suryacake-e309f.firebasestorage.app",
  messagingSenderId: "167702429980",
  appId: "1:167702429980:web:fbc7d376c38fc875b4bad9",
  measurementId: "G-FWGYMXQVHL"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
