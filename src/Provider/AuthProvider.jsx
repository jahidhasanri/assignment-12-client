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
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [loader, setLoader] = useState(true);
  const axiosPublic= UseAxiosPublic();

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
  
      if (currentUser) {
        const userInfo = { email: currentUser.email };
  
        try {
          // Sending request to get the JWT token
          const res = await axiosPublic.post('/jwt', userInfo);
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        
          const info ={
            name: currentUser?.displayName,
            image: currentUser?.photoURL,
            email: currentUser.email,
          }
          
          // Save user info to the backend
          
        } catch (error) {
          toast.error("Error occurred while processing user:", error.message);
        }
      } else {
        // Remove token if the user is not authenticated
        localStorage.removeItem('access-token');
      }
  
      // Stop loading after handling authentication state
      setLoader(false);
    });
  
    // Cleanup function to unsubscribe from auth state changes
    return () => unsubscribe();
  }, [user]);
  

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
