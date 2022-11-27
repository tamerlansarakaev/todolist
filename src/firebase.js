// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAfAscp-kS5Nk7gvLm3KLGNBBNuq-awUHs',
  authDomain: 'todo-e62a9.firebaseapp.com',
  databaseURL:
    'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-e62a9',
  storageBucket: 'todo-e62a9.appspot.com',
  messagingSenderId: '799069096497',
  appId: '1:799069096497:web:2ea8c3601ceeff8358a310',
  measurementId: 'G-7HP90RE5ES',
};

// const { onRequest } = require('firebase-functions/v2/https');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
