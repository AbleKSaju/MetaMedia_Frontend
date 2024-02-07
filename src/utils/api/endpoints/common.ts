import {AUTH_URL,POST_URL,STORY_URL,USER_URL} from '../baseUrl/axios.baseUrl' 


// AUTH SERVICE

export const Login_Api = `${AUTH_URL}/login`
export const Logout_APi = `${AUTH_URL}/logout`
export const SignUp_Api = `${AUTH_URL}/signup`
export const VerifyOtp_Api = `${AUTH_URL}/verifyOtp`
export const LoginWithGoogle_Api=`${AUTH_URL}/loginWithGoogle`
export const LoginWithFacebook_Api=`${AUTH_URL}/loginWithFaceBook`
export const ChooseInterest_Api=`${AUTH_URL}/chooseInterest`
export const ForgotPassword_Api=`${AUTH_URL}/forgotPassword`
export const ChangePassword_Api=`${AUTH_URL}/changePassword`
export const AddProfile_Api=`${AUTH_URL}/addProfile`
export const RefreshToken_Api=`${AUTH_URL}/refresh`


// STORY SERVICE

export const AddHighlight_Api=`${STORY_URL}/addHighlight`