// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getFirestore,
    getDocs,
    addDoc,
    setDoc, 
    collection,
    doc,
    writeBatch,
    query,
    where,
    getDoc,
    deleteDoc,
    onSnapshot,
    arrayUnion,
    updateDoc

} from "firebase/firestore"

import { GoogleAuthProvider,
     getAuth, 
     signInWithPopup, 
     signOut,
     onAuthStateChanged,
     signInWithRedirect,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     getRedirectResult,
     deleteUser,
     updateProfile
    
    } from "firebase/auth";

 import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//SDK for YYCServices PROD
// Paste your firebase config in the curly braces
const firebaseConfig = {}



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app)
export {getDocs,getDoc, setDoc, addDoc, deleteDoc, collection, doc, writeBatch, updateDoc, query, where, onSnapshot, arrayUnion }

export const projectAuth = getAuth()
export const provider = new GoogleAuthProvider();
export {signInWithPopup, signInWithEmailAndPassword, getRedirectResult, signOut, onAuthStateChanged,
       signInWithRedirect, createUserWithEmailAndPassword, getAuth, deleteUser, updateProfile}

export {uploadBytes,ref, getDownloadURL}

export const projectStorage = getStorage(app)
// export const storageRef = ref()