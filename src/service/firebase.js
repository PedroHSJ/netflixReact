// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASdNu7usmQ8i2a2Cr-CLqAQB7jrcTOfLE",
  authDomain: "fir-auth-a16d3.firebaseapp.com",
  projectId: "fir-auth-a16d3",
  storageBucket: "fir-auth-a16d3.appspot.com",
  messagingSenderId: "213365645553",
  appId: "1:213365645553:web:7c747c2629c57fd6bdc950"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

export {app, auth, firebase}
