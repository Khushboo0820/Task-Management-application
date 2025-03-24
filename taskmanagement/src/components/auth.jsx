import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signInWithRedirect, signOut } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Auth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in: ", error);
      
      // Handle popup blocked error
      if (error.code === "auth/popup-blocked" || error.code === "auth/cancelled-popup-request") {
        console.log("Popup blocked, trying redirect...");
        await signInWithRedirect(auth, provider);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default Auth;
