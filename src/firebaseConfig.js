import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB081rLRg_swkhYfvu60qg8s477ea9Tk0Q",
  authDomain: "amit2-e79d2.firebaseapp.com",
  projectId: "amit2-e79d2",
  storageBucket: "amit2-e79d2.appspot.com",
  messagingSenderId: "1011148231616",
  appId: "1:1011148231616:web:57e0d3fb9ad34f5c902e25",
  measurementId: "G-ZL51KLNL31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
export {database, auth, storage}