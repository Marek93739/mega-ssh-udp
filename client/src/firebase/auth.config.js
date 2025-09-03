import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mega-udp.firebaseapp.com",
  projectId: "mega-udp",
  storageBucket: "mega-udp.firebasestorage.app",
  messagingSenderId: "578873076819",
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export default app;