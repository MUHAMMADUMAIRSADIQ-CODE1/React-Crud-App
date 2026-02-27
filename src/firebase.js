// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzh17lBi_nyx4G8KUA_wizI_bXBSiS_ho",
    authDomain: "social-media-30a9b.firebaseapp.com",
    projectId: "social-media-30a9b",
    storageBucket: "social-media-30a9b.firebasestorage.app",
    messagingSenderId: "909813908532",
    appId: "1:909813908532:web:088376b69d72ae55353661",
    measurementId: "G-1BNYWKWYPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export let auth=getAuth(app)
export let provider=new GoogleAuthProvider()
export {signInWithPopup}