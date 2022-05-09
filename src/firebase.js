import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAHQBm7lW3rc2fWgf7se0tTKuAejTizaR4',
  authDomain: 'task-reminder-4e65a.firebaseapp.com',
  projectId: 'task-reminder-4e65a',
  storageBucket: 'task-reminder-4e65a.appspot.com',
  messagingSenderId: '218840294044',
  appId: '1:218840294044:web:58e5648dab1c30df460359',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
