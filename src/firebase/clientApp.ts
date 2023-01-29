// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase for Server Side Rendering
// We do not want to initialize 'app' twice (server side & client side)
// So if getApps().length === 0 we initialze a new app else we getApp()
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Create firestore instance (db for json data)
const firestore = getFirestore(app);
// Create Auth instance (connects our app with firebase auth)
const auth = getAuth(app);
// Create storage instance (storage is for e.g. files & pictures)
const storage = getStorage(app);

export { app, firestore, auth, storage }