/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const googleLogin = () => {
  return signInWithPopup(auth, googleProvider);
};

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");

  /* --------------- */
  console.log(user);

  const createUser = (email, password) => {
    setLoading(true);
    //  console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /* ------------------ */
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      //   console.log("Logged", loggedUser);
      setUser(loggedUser);
      if (loggedUser) {
        setName(loggedUser.displayName);
        setPhoto(loggedUser.photoURL);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    });
  }

  const authInfo = {
    user,
    createUser,
    login,
    photo,
    logOut,
    loading,
    googleLogin,
    name,
    updateUserProfile,
    setLoading,
  };
  // console.log(user);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
