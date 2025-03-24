// Import Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithRedirect } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAeARuOYk4yaTQlVPm1uObtWxWlXnxIJ8",
  authDomain: "task-management-apllication.firebaseapp.com",
  projectId: "task-management-apllication",
  storageBucket: "task-management-apllication.firebasestorage.app",
  messagingSenderId: "567077782169",
  appId: "1:567077782169:web:e01e82e7e91b44a0c02e08",
  measurementId: "G-XZ46N3CPK8"
};

// Prevent Firebase from initializing multiple times
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export authentication functions
export { auth, provider, signInWithPopup, signOut ,signInWithRedirect};
export default app;
