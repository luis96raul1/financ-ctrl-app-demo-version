import {
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithEmail,
  signInWithGoogle,
} from "../../../firebase/providers";
import { cleanConfigurations } from "../appConfigurations";
import { checkingCredentials, login, logout } from "../authConfigurations";
import { cleanData } from "../mainData";

export const checkingAuthentication = (email, password) => {
  return (dispatch) => {
    console.log("dispatch(checkingCredentials())");
    // dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return (dispatch) => {
    dispatch(checkingCredentials());
    signInWithGoogle().then((result) => {
      if (!result.ok) {
        dispatch(logout({ errorMessage: result.errorMessage }));
      } else {
        dispatch(login(result));
        sessionStorage.setItem("auth", result);
      }
    });
  };
};

export const startEmailSignIn = ({ email, password }) => {
  return (dispatch) => {
    dispatch(checkingCredentials());
    signInWithEmail(email, password).then((result) => {
      if (!result.ok) {
        dispatch(logout({ errorMessage: result.errorMessage }));
      } else {
        dispatch(login(result));
      }
    });
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return (dispatch) => {
    dispatch(checkingCredentials());
    registerUserWithEmailPassword(email, password, displayName).then(
      (result) => {
        if (!result.ok) {
          dispatch(logout({ errorMessage: result.errorMessage }));
        } else {
          dispatch(login(result));
        }
      }
    );
  };
};

export const startLogout = () => {
  return (dispatch) => {
    logoutFirebase().then(() => {
      dispatch(logout({ errorMessage: null }));
      dispatch(cleanConfigurations());
      dispatch(cleanData());
    });
  };
};

export const verifyLoginStatus = () => {
  return (dispatch) => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) startLogout();
    });
  };
};
