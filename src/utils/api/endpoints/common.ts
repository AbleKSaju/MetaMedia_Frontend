import {AUTH_URL,HIGHLIGHT_URL,POST_URL,STORY_URL,USER_URL} from '../baseUrl/axios.baseUrl' 

// AUTH SERVICE

export const Login_Api = `${AUTH_URL}/login`
export const Logout_APi = `${AUTH_URL}/logout`
export const SignUp_Api = `${AUTH_URL}/signup`
export const VerifyOtp_Api = `${AUTH_URL}/verifyOtp`
export const LoginWithGoogle_Api=`${AUTH_URL}/loginWithGoogle`
export const LoginWithFacebook_Api=`${AUTH_URL}/loginWithFaceBook`
export const ForgotPassword_Api=`${AUTH_URL}/forgotPassword`
export const ChangePassword_Api=`${AUTH_URL}/changePassword`
export const RefreshToken_Api=`${AUTH_URL}/refresh`

// USER SERVICE

export const GetUserData_Api=`${USER_URL}/getUserData`
export const ChooseInterest_Api=`${USER_URL}/chooseInterest`
export const AddProfile_Api=`${USER_URL}/addProfile`
export const EditProfile_Api=`${USER_URL}/editProfile`
export const AddProfileImage_Api=`${USER_URL}/addProfileImage`

// STORY SERVICE

        //Story

export const AddHighlight_Api=`${STORY_URL}/addHighlight`
export const AddStory_Api=`${STORY_URL}/addStory`
export const DeleteStory_Api=`${STORY_URL}/deleteStory`
export const GetStories_Api=`${STORY_URL}/getStories`
export const GetAllStories_Api=`${STORY_URL}/getAllStories`
export const getMyAllStoriesForHighLightList_Api=`${STORY_URL}/getMyAllStoriesForHighLigh`

        //Highlight
export const AddNewHighlight_Api=`${HIGHLIGHT_URL}/addNewHighlight`
export const DeleteHighlight_Api=`${HIGHLIGHT_URL}/deleteHighlight`
export const GetHighlightData_Api=`${HIGHLIGHT_URL}/getHighlights`
