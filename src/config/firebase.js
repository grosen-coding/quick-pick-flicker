import firebase from "firebase/app";
import "firebase/firebase-database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDx4xo9FD5OQBBzyDryQr57Mn0_QRLaikE",
    authDomain: "quickflik-picker.firebaseapp.com",
    databaseURL: "https://quickflik-picker-default-rtdb.firebaseio.com",
    projectId: "quickflik-picker",
    storageBucket: "quickflik-picker.appspot.com",
    messagingSenderId: "272805616655",
    appId: "1:272805616655:web:c0b2fe117a00a6df17d77a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;