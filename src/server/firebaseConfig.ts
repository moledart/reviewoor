// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGt3DQVPYEEUNfehzEAIMglv9Cu6dQq1I",
  authDomain: "reviewoor-5c6c1.firebaseapp.com",
  projectId: "reviewoor-5c6c1",
  storageBucket: "reviewoor-5c6c1.appspot.com",
  messagingSenderId: "241607435334",
  appId: "1:241607435334:web:41145b1c85c969ff311647",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
