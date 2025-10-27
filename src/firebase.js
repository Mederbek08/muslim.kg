// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdADYMnHDYEHRT_59rneLQDWTMn8KtAJw",
  authDomain: "muslim-kg.firebaseapp.com",
  projectId: "muslim-kg",
  storageBucket: "muslim-kg.appspot.com",
  messagingSenderId: "186239038417",
  appId: "1:186239038417:web:c434422acb832f7b4426f0",
  measurementId: "G-PKLEFLEWHN"
};

const app = initializeApp(firebaseConfig);

// Export all Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);