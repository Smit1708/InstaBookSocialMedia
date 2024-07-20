// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABwfYtB2LcYCh7l3fWVXlpEAjjHVeeYeU",
  authDomain: "social-media-46d65.firebaseapp.com",
  databaseURL: "https://social-media-46d65-default-rtdb.firebaseio.com",
  projectId: "social-media-46d65",
  storageBucket: "social-media-46d65.appspot.com",
  messagingSenderId: "283607692134",
  appId: "1:283607692134:web:c0ee27a0788956b6238ea7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)





