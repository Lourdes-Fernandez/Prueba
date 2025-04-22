// Importar solo lo necesario desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAK-k2TUACgsHPu96kv7QyN8TXzMFNTI4o",
    authDomain: "crud-a8e84.firebaseapp.com",
    projectId: "crud-a8e84",
    storageBucket: "crud-a8e84.firebasestorage.app",
    messagingSenderId: "379624969084",
    appId: "1:379624969084:web:d963775110656ee2c50af9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, collection, doc, addDoc, getDocs, updateDoc, deleteDoc };