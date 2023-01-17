// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn1ywAG79cJ_lSMPl63huGDCCKG7EuFl4",
  authDomain: "electronics-store-13966.firebaseapp.com",
  projectId: "electronics-store-13966",
  storageBucket: "electronics-store-13966.appspot.com",
  messagingSenderId: "285900612663",
  appId: "1:285900612663:web:e313f97fc0650fb2260bb2"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);

}

export { firebase, getDownloadURL, getStorage, ref }






