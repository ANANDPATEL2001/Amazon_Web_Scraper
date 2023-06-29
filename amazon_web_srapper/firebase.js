// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBexWTsqV1ElTchFtt8WDALXD2sjnNMV6A",
    authDomain: "web-scrapper-3f21b.firebaseapp.com",
    projectId: "web-scrapper-3f21b",
    storageBucket: "web-scrapper-3f21b.appspot.com",
    messagingSenderId: "519742923865",
    appId: "1:519742923865:web:fff7e3a5a8d27e5753bd48"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };