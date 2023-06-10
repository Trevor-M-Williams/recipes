import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD779pex3OJbzsNBR7oJy9rD75PwRL-Zd8",
  authDomain: "recipes-658a4.firebaseapp.com",
  projectId: "recipes-658a4",
  storageBucket: "recipes-658a4.appspot.com",
  messagingSenderId: "1016942717353",
  appId: "1:1016942717353:web:10bf0d789770b3918dbcb8",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
};
