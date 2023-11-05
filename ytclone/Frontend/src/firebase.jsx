
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyA3yYsewDO62RO2yr2AuZA0jsn6JVllBF8",
  authDomain: "yt-clone-ef011.firebaseapp.com",
  projectId: "yt-clone-ef011",
  storageBucket: "yt-clone-ef011.appspot.com",
  messagingSenderId: "69886804081",
  appId: "1:69886804081:web:5aed33ae40a3288da51bd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth();

export const provider = new GoogleAuthProvider();
export default app;