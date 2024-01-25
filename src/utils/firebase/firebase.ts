import { getAuth, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./init";

const auth = getAuth(app);

const fbAuthProvider = new FacebookAuthProvider();
const googlePrivider=new GoogleAuthProvider()
export const FacebookAuth = async () => {
  try {
    const fbAuth = signInWithPopup(auth, fbAuthProvider);
    return fbAuth;
  } catch (error) {
    console.log(error);
  }
};


export const GoogleAuth=async()=>{
  try {
    const googleAuth= signInWithPopup(auth,googlePrivider)
    return googleAuth
    
  } catch (error) {
    console.log('Error in the the gogle auth firebase',error);
    
  }
}