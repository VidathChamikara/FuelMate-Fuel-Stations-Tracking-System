// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT8hLNUy5_gQOG6w-Kpy5tlA1aa77t1fI",
  authDomain: "fuelmate-ccf1f.firebaseapp.com",
  projectId: "fuelmate-ccf1f",
  storageBucket: "fuelmate-ccf1f.appspot.com",
  messagingSenderId: "1081161365634",
  appId: "1:1081161365634:web:b69d3bc2ca1ceddaad1c9b",
  measurementId: "G-BVFDTGZZLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
app.appVerificationDisabledForTesting = false;
export default app;
