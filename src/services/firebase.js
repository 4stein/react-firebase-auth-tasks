import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHEcncDPGreSlOSoU95rtimz0_AjZ4c9g',
  authDomain: 'react-firebase-auth-tasks.firebaseapp.com',
  projectId: 'react-firebase-auth-tasks',
  storageBucket: 'react-firebase-auth-tasks.appspot.com',
  messagingSenderId: '349991290848',
  appId: '1:349991290848:web:50f317a7b6fedf82e70d85',
  measurementId: 'G-NMGQE5RTDP',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const db = getFirestore(app);

export const fireStore = firebase;
