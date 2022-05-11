import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const serviceAccount = {
  apiKey: 'AIzaSyAHQBm7lW3rc2fWgf7se0tTKuAejTizaR4',
  authDomain: 'task-reminder-4e65a.firebaseapp.com',
  projectId: 'task-reminder-4e65a',
  storageBucket: 'task-reminder-4e65a.appspot.com',
  messagingSenderId: '218840294044',
  appId: '1:218840294044:web:58e5648dab1c30df460359',
};

initializeApp(serviceAccount);

export const db = getFirestore();
export const auth = getAuth();
export const COLLECTION = 'Reminders';
