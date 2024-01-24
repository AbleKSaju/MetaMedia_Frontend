import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./init";

const auth = getAuth(app);

const fbAuthProvider = new FacebookAuthProvider();

export const FacebookAuth = async () => {
  try {
    const fbAuth = signInWithPopup(auth, fbAuthProvider);
    return fbAuth;
  } catch (error) {
    console.log(error);
  }
};
