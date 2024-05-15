import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebaseconfig";
import axios from "axios";
const auth = getAuth(app);

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };

      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post(
            "https://nourisg4all-server-assign-11.vercel.app/jwt",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            // console.log("token response", res.data);
          });
      } else {
        axios
          .post(
            "https://nourisg4all-server-assign-11.vercel.app/logout",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            // console.log(res.data);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authInfo = {
    createUser,
    user,
    logOut,
    loginUser,
    loading,
    googleLogin,
    githubLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
