import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCsEy95BwZAJcW_9oIyfRIb1tYjxzp0FZQ',
  authDomain: 'campus-budget-eats.firebaseapp.com',
  projectId: 'campus-budget-eats',
  storageBucket: 'campus-budget-eats.appspot.com',
  messagingSenderId: '755160539',
  appId: '1:755160539:web:b94d042fb9412bd225c3fe',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
