import {ChangePasswordFunction,ForgotPasswordFunction,LoginFuntion,LoginWithFacebook,LoginWithGoogle,LogoutFunction,SignUpFunction,verifyOtpFunction} from './AuthService/post'
import {AddProfileFunction,ChooseInterestFunction,EditProfileFunction,addProfileImageFunction} from './UserService/post'
import {addHighlightFunction,AddStoryFunction,deleteStoryFunction} from './StoryService/Story/post'
import { getStoriesFunction } from './StoryService/Story/get'
import {GetHighlightData} from './StoryService/Highlight/get'
import {addNewHighlightFunction} from './StoryService/Highlight/post'
export{
    ChangePasswordFunction,
    ForgotPasswordFunction,
    LoginFuntion,
    LoginWithFacebook,
    LoginWithGoogle,
    LogoutFunction,
    SignUpFunction,
    verifyOtpFunction,
    addHighlightFunction,
    AddProfileFunction,
    ChooseInterestFunction,
    EditProfileFunction,
    addProfileImageFunction,
    AddStoryFunction,
    deleteStoryFunction,
    GetHighlightData,
    addNewHighlightFunction,
    getStoriesFunction
    
}