import {AUTH_URL,CHAT_URL,HIGHLIGHT_URL,POST_URL,STORY_URL,USER_URL} from '../baseUrl/axios.baseUrl' 

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
export const GetUsersData_Api=`${USER_URL}/getUsersDataById`
export const ChooseInterest_Api=`${USER_URL}/chooseInterest`
export const AddProfile_Api=`${USER_URL}/addProfile`
export const EditProfile_Api=`${USER_URL}/editProfile`
export const AddProfileImage_Api=`${USER_URL}/addProfileImage`
export const GetAllUsers_Api=`${USER_URL}/getAllUsers`
export const getUsersByName_Api=`${USER_URL}/getUsersByname`
export const getuserById_Api=`${USER_URL}/getUserById`

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

//POST

export const AddPost_Api=`${POST_URL}/addPost`
export const SearchLocation_Api=`${POST_URL}/searchLocation`
export const getLatAndLong_Api=`${POST_URL}/getLatandLog`
export const getUserPosts_Api=`${POST_URL}/getAllPost`
export const showAllPost_Api=`${POST_URL}/showAllPost`
export const likePost_Api=`${POST_URL}/likePost`
export const AddComent_Api=`${POST_URL}/addComment`
export const ReportPost_Api=`${POST_URL}/reportPost`

//CHAT

export const GetConversations_Api=`${CHAT_URL}/conversations`
export const GetMessages_Api=`${CHAT_URL}/getMessages`
export const SendMessage_Api=`${CHAT_URL}/message`
