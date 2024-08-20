"use client"
import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDON1l8iLqOLR4C2wL2Zw4gCHQ7uE5WFMY",
    authDomain: "migow-chats.firebaseapp.com",
    projectId: "migow-chats",
    storageBucket: "migow-chats.appspot.com",
    messagingSenderId: "556384059640",
    appId: "1:556384059640:web:c65f245dbfb6c9b9663b0d",
    measurementId: "G-ECGC0EX5SN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const storage = getStorage(app)
// const auth = getAuth(app);

// onAuthStateChanged(auth, user => {
//     // Check for user status
// });

export {
    db,
    storage,
    // auth,
}

