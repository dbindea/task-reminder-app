import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

initializeApp({
  apiKey: 'AIzaSyBPUEDqe10v3EwKR07dESS3S1diLkZLQ70',
  authDomain: 'taskreminderapp-com.firebaseapp.com',
  projectId: 'taskreminderapp-com',
  storageBucket: 'taskreminderapp-com.appspot.com',
  messagingSenderId: '749583481836',
  appId: '1:749583481836:web:0d50eda0efa29766c89ec9',
});

export const db = getFirestore();
export const auth = getAuth();
