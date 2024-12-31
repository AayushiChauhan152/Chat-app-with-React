import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkC3gfb7ogqAVvcbMfDXz3wH08W23Cqr0",
  authDomain: "bytegalchatapp.firebaseapp.com",
  projectId: "bytegalchatapp",
  storageBucket: "bytegalchatapp.firebasestorage.app",
  messagingSenderId: "965609146809",
  appId: "1:965609146809:web:54f7690f9478be340cce68",
  measurementId: "G-ZTZ23HB9JC",
};

export const app = initializeApp(firebaseConfig);
