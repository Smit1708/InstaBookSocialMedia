// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD__ZnYppGJMu_mhqkbB6WUV9djObaCzfg",
  authDomain: "instabook-525e4.firebaseapp.com",
  projectId: "instabook-525e4",
  storageBucket: "instabook-525e4.appspot.com",
  messagingSenderId: "472178280982",
  appId: "1:472178280982:web:a8198afe5a8f556ae10337"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)





