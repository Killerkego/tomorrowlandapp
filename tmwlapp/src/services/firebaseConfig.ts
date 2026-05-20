import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWowOGd60v7ptCu_YtdP06xMDfRtguDWg",
  authDomain: "tmwlapp.firebaseapp.com",
  projectId: "tmwlapp",
  storageBucket: "tmwlapp.firebasestorage.app",
  messagingSenderId: "790641085173",
  appId: "1:790641085173:web:3b2225d9a1248a8a9ed3bc",
  measurementId: "G-646WPWJGLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics might not be supported in all environments (e.g. Node or some native configs)
let analytics;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { app, auth, db, analytics };
