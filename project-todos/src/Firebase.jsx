// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiwAQq12Z5xBYGl-KRXh5XGam64FY1LJ0",
  authDomain: "project-todos-7d180.firebaseapp.com",
  projectId: "project-todos-7d180",
  storageBucket: "project-todos-7d180.appspot.com",
  messagingSenderId: "16552059054",
  appId: "1:16552059054:web:2359101ba8fb4c89630d3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
