import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const handelRegistWemail = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handelLoginWemail = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleSingOut = () => {
    setLoader(true);
    return signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();

  const handelLoginWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updatedProfile = (name,photoUrl)=>{
    return updateProfile(auth.currentUser, {
        displayName: name , photoURL: photoUrl
      })
  }

  const authInfo = {
    user,
    loader,
    setUser,
    setLoader,
    handelRegistWemail,
    handelLoginWemail,
    handleSingOut,
    handelLoginWithGoogle,
    updatedProfile
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoader(false);

      if (currentUser) {
        try {
          // Save user to backend
          await axios.post(`http://localhost:5000/users/${currentUser.email}`, {
            name: currentUser.displayName,
            image: currentUser.photoURL,
            email: currentUser.email,
          });
        } catch (error) {
          console.error("Failed to save user:", error.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
