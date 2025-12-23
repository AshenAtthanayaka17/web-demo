import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Placeholder configuration - User needs to replace these with actual values
const firebaseConfig = {
  apiKey: "AIzaSyAxA4GHwsZkSd4cJMlDJB3eru20D0cGiYQ",
  authDomain: "ashenatthanayaka17.firebaseapp.com",
  projectId: "ashenatthanayaka17",
  storageBucket: "ashenatthanayaka17.firebasestorage.app",
  messagingSenderId: "670715739594",
  appId: "1:670715739594:web:ef0c6ff3608949582be333",
  measurementId: "G-RXPS00RRML"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
