import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHEcncDPGreSlOSoU95rtimz0_AjZ4c9g',
  authDomain: 'react-firebase-auth-tasks.firebaseapp.com',
  projectId: 'react-firebase-auth-tasks',
  storageBucket: 'react-firebase-auth-tasks.appspot.com',
  messagingSenderId: '349991290848',
  appId: '1:349991290848:web:50f317a7b6fedf82e70d85',
  measurementId: 'G-NMGQE5RTDP',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
