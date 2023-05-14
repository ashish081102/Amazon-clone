import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCxSemaqs-TjzzrhLLLdnOw_bVSNd4mqqw",
    authDomain: "clone-76f4d.firebaseapp.com",
    projectId: "clone-76f4d",
    storageBucket: "clone-76f4d.appspot.com",
    messagingSenderId: "613324755538",
    appId: "1:613324755538:web:84c0a97bf4cdcf702bc58b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth } 