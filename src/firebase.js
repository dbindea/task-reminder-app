import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
  // put your credentials
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
