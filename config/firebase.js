// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDM_hnvKrtcvghtjkR-Ms2oSa9xWaagot8",
    authDomain: "gordinbutchershop-3eefa.firebaseapp.com",
    projectId: "gordinbutchershop-3eefa",
    storageBucket: "gordinbutchershop-3eefa.firebasestorage.app",
    messagingSenderId: "437670591536",
    appId: "1:437670591536:web:bb21e7d208f3cd9f8e01f5"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged };