import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../firebase/firebase";

import PropTypes from "prop-types";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = async (email, password) => {
    setLoading(true);
    // auth.createUserWithEmailAndPassword(email, password);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  };

  // update user profile
  const updateUserProfile = (user, displayName) => {
    setLoading(true);
    return updateUserProfile(auth.currentUser, { displayName: displayName });
  };

  // Login with  email Password
  const signin = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  // Forget Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // login with google
  const loginWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider);
  };

  // login with facebook
  const loginWithFacebook = () => {
    setLoading(true);
    signInWithPopup(auth, facebookProvider);
  };

  // logout
  const logout = () => {
    setLoading(true);
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe(); // unmounts the listener
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        createUser,
        updateUserProfile,
        signin,
        loginWithFacebook,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
