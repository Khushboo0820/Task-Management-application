import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {setUser , logout } from "../store/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        };
        dispatch(setUser(userData));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      dispatch(setUser(userData));
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <img src={user.photo} alt="Profile" width="50" height="50" />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default Auth;
