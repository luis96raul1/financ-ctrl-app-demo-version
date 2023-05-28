import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { errorMessages } from "../utils/Constants";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return (
    signInWithPopup(FirebaseAuth, googleProvider)
      // return signInWithRedirect(FirebaseAuth, googleProvider)
      // return signInWithCredential()
      .then((response) => {
        const userData = response.user;
        return {
          ok: true,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          uid: userData.uid,
        };
      })
      .catch((error) => {
        console.log(error);
        return { ok: false, errorMessage: errorMessages[error.code] };
      })
  );
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(FirebaseAuth, email, password)
    .then((response) => {
      const userData = response.user;
      return {
        ok: true,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        uid: userData.uid,
      };
    })
    .catch((error) => {
      console.log(error.code);
      return { ok: false, errorMessage: errorMessages[error.code] };
    });
};

export const registerUserWithEmailPassword = (email, password, displayName) => {
  return createUserWithEmailAndPassword(FirebaseAuth, email, password)
    .then((response) => {
      const userData = response.user;
      updateProfile(FirebaseAuth.currentUser, { displayName });
      return {
        ok: true,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        uid: userData.uid,
        displayName,
      };
    })
    .catch((error) => {
      console.log(error.code);
      return { ok: false, errorMessage: errorMessages[error.code] };
    });
};

export const logoutFirebase = () => {
  return FirebaseAuth.signOut();
};
