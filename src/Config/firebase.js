import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDE-E-jhD2TwLT421uyjyfF5NJ0kUO6OX0",
  authDomain: "posting-web-d5cee.firebaseapp.com",
  projectId: "posting-web-d5cee",
  storageBucket: "posting-web-d5cee.appspot.com",
  messagingSenderId: "972210149573",
  appId: "1:972210149573:web:42096163e3b0fce596f8ac",
  measurementId: "G-1ML0ZTP93L",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
