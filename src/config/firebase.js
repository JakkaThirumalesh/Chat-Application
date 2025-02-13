import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realtime-chatapp-7d71d.firebaseapp.com",
  projectId: "realtime-chatapp-7d71d",
  storageBucket: "realtime-chatapp-7d71d.firebasestorage.app",
  messagingSenderId: "335097091149",
  appId: "1:335097091149:web:e755634a3a9d6bcc10f804",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
