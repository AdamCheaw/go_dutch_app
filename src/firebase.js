import { initializeApp } from 'firebase';

const app = initializeApp({
  //copy own firebase config info
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
});

export const db = app.database();