// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Global variables
const firebaseConfig = {
  apiKey: "AIzaSyDTBeZDGml9Xx-lwVofcrdoQD130jwbIKQ",
  authDomain: "phone-free-8b8a6.firebaseapp.com",
  projectId: "phone-free-8b8a6",
  storageBucket: "phone-free-8b8a6.firebasestorage.app",
  messagingSenderId: "991435752591",
  appId: "1:991435752591:web:e288b764809a8f6ec01cfa",
  measurementId: "G-77J24S5QVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth };