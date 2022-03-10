// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1GdJbLI4hWf9wJLRUa6AS7VLyLKuzRrk",
  authDomain: "facebook-clone-f4005.firebaseapp.com",
  projectId: "facebook-clone-f4005",
  storageBucket: "facebook-clone-f4005.appspot.com",
  messagingSenderId: "65273365133",
  appId: "1:65273365133:web:a77d4745f48494600f18c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();

export {db, storage}