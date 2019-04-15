import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: "AIzaSyA-u1RqOPXa1q8j77fkhyG9dFE8NCPWOnU",
  authDomain: "godutch-16677.firebaseapp.com",
  databaseURL: "https://godutch-16677.firebaseio.com",
  projectId: "godutch-16677",
  storageBucket: "godutch-16677.appspot.com",
  messagingSenderId: "901853536386"
});

export const db = app.database();
export const auth = app.auth();
export default app;