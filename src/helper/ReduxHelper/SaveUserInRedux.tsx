import React from "react";
import { ResponseData } from "../../utils/interface/userInterface";
import { useDispatch } from "react-redux";
import { addUser, clearUser } from "../../utils/ReduxStore/Slice/userSlice";
import { addToken } from "../../utils/ReduxStore/Slice/tokenSlice";

const SaveUserDataInRedux = (response : any) => {
    console.log("ENTER TO SaveUserDataInRedux");
    
    const dispatch = useDispatch();
    console.log(response,"resDetailsdaa");
    // return new Promise<void>((resolve, reject) => {
        
      const data: ResponseData = {
        email: response.data.user.email ?? '',
        name: response.data.user.name ?? '',
        userName: response.data.user.userName ?? '',
        userId: response.data.user._id ?? '',
        profile: response.data.user.profile ?? '',
        isGoogle: response.data.user.isGoogle ?? '',
        isFacebook: response.data.user.isFacebook ?? '',
        dateOfBirth: response.data.user.dateOfBirth ?? '',
        gender: response.data.user.gender ?? '',
        location: response.data.user.location ?? '',
        phoneNumber: response.data.user.phoneNumber ?? '',
        interests: response.data.user.interests ?? [],
        bio: response.data.user.bio ?? '',
      };
      console.log(data,"ussssssDATta??????????");
      
      dispatch(clearUser());
      dispatch(addUser(data));
      dispatch(addToken(response.data.accesstoken));  

    //   resolve()
//   })
};


export default SaveUserDataInRedux;
