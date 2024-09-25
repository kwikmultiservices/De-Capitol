import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let isFirebaseInitialized = false;

const FirebaseApp = {
  apiKey: "AIzaSyCzF5Jp8EpMtsAR2q_XIXuVN9wdV1er50A",
  authDomain: "de-capitol.firebaseapp.com",
  projectId: "de-capitol",
  storageBucket: "de-capitol.appspot.com",
  messagingSenderId: "611157182551",
  appId: "1:611157182551:web:e81014bda05167d8207b12"
};

let database: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

const initializeFirebase = () => {
  if (!isFirebaseInitialized) {
    const app = initializeApp(FirebaseApp);
    database = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    isFirebaseInitialized = true;
  }
};

initializeFirebase();

export { auth, database, storage };
