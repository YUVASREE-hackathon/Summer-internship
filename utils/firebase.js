import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuS-vMG1EVmkJSXU5wVyLPCjqXKSlx52k",
  authDomain: "workwise-3a46e.firebaseapp.com",
  projectId: "workwise-3a46e",
  storageBucket: "workwise-3a46e.appspot.com",
  messagingSenderId: "215479130612",
  appId: "1:215479130612:web:aa76d14ba90b48764bc1a1",
  measurementId: "G-3KWC2M7CCS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
