// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrRqTFzxHZmJBycWUVo5y73xN5XZYkSfk",
  authDomain: "vite-contact-b613c.firebaseapp.com",
  projectId: "vite-contact-b613c",
  storageBucket: "vite-contact-b613c.appspot.com",
  messagingSenderId: "875935739623",
  appId: "1:875935739623:web:55bb1f0d823b387ee47c42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);