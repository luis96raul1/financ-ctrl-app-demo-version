import { FirebaseAuth } from "@/firebase/config";
import { checkingCredentials } from "@/redux/slices/authConfigurations";
import {
  login,
  logout,
  sessionStatus,
} from "@/redux/slices/authConfigurations";
import { NotLoggedStatus } from "@/utils/Constants";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCheckAuth = () => {
  const { status } = useSelector(sessionStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === NotLoggedStatus) {
      dispatch(checkingCredentials());
    }
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout({ errorMessage: null }));
      if (status === NotLoggedStatus) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(login({ uid, email, displayName, photoURL }));
      }
    });
  }, []);

  return { authStatus: status };
};
