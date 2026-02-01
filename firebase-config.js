// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX1CLMo9DtNEcVfSYnNWJltOr9-7o9Jmw",
  authDomain: "puthakhun99.firebaseapp.com",
  projectId: "puthakhun99",
  storageBucket: "puthakhun99.firebasestorage.app",
  messagingSenderId: "255093387312",
  appId: "1:255093387312:web:8430bf772a9518ad17bdf5",
  measurementId: "G-TB7TH5YL2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
