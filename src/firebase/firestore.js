// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ3r6ZyglqDkNZ6GZI_5VZ8aOsVFLtpsk",
  authDomain: "degen-age.firebaseapp.com",
  projectId: "degen-age",
  storageBucket: "degen-age.appspot.com",
  messagingSenderId: "135163605749",
  appId: "1:135163605749:web:afc6b230dad1114666cbbc",
  measurementId: "G-YY4MY9F2ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}