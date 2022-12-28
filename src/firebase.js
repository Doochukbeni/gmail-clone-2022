// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASqIwwJpE8u9Eb8nxj0kZzpSG6DmMcTHE",
  authDomain: "clone-yt-3feba.firebaseapp.com",
  projectId: "clone-yt-3feba",
  storageBucket: "clone-yt-3feba.appspot.com",
  messagingSenderId: "968916718655",
  appId: "1:968916718655:web:0478c6e5009df59487d48a",
  measurementId: "G-QLGVP65MMH",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
// const provider = new firebaseApp.auth.GoogleAuthProvider();

export { db, auth, provider };
