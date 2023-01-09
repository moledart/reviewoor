// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZtuyd8y1FqUixCWiMuYS-dc9Osg2t4Ew",
  authDomain: "itra-course-2d3f3.firebaseapp.com",
  projectId: "itra-course-2d3f3",
  storageBucket: "itra-course-2d3f3.appspot.com",
  messagingSenderId: "1086333159172",
  appId: "1:1086333159172:web:ce44d700c635c262353251",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
