// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b563d.firebaseapp.com",
  projectId: "mern-blog-b563d",
  storageBucket: "mern-blog-b563d.appspot.com",
  messagingSenderId: "935219403946",
  appId: "1:935219403946:web:46713303c05d719147c4d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);