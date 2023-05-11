// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhzab8UiZYCS_FKNa9jqnNFJDBs7gB_V0",
  authDomain: "motormax-nl.firebaseapp.com",
  projectId: "motormax-nl",
  storageBucket: "motormax-nl.appspot.com",
  messagingSenderId: "342868942421",
  appId: "1:342868942421:web:67c73bd5c663558c6c3edc",
  measurementId: "G-9NHS9T9R9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
