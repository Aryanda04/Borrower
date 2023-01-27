import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDgBs3O1SS2JhQHE8X0PX_y6hwns35g644",

  authDomain: "esp-firebase-project-67a6e.firebaseapp.com",

  databaseURL:
    "https://esp-firebase-project-67a6e-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "esp-firebase-project-67a6e",

  storageBucket: "esp-firebase-project-67a6e.appspot.com",

  messagingSenderId: "865751433700",

  appId: "1:865751433700:web:e177a09275c7939196c7f1",

  measurementId: "G-XMVDY1F9WL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getDatabase(app);

const logInWithEmailAndPassword = async (email, password, e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

export { auth, db, ref, set, logInWithEmailAndPassword, logout };
