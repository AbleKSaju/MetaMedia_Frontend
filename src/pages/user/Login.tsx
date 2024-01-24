import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import { LoginFuntion } from '../../utils/api/metords/post';
import {addUser,clearUser} from '../../utils/ReduxStore/Slice/userSlice'
import {LoginWithGoogle} from '../../utils/api/metords/post'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'sonner';
import mongoose from 'mongoose'
import { LoginFormData, useValidate } from '../../utils/formValidation/LoginValidation';



const Login = () => {
    

    
    const user= useSelector((state:any)=>state.user.userId)
    const dispatch = useDispatch()
    const Navigate=useNavigate()
    

//-------------
const handleGoogle=()=>{

}
//-------------


const { errors, handleSubmit, register } = useValidate();

//google sign up
  const responseMessage: any = async(response: any) => {
    const decode: any = jwtDecode(response.credential);
    console.log(decode);
     
    if(decode.email_verified==true){
     
        const data={
            profile:decode.picture,
            email:decode.email,
            name:decode.given_name,
            isGoogle:true,
            isFacebook:false
        }

        const responce:any = await LoginWithGoogle(data)
 if(responce){
console.log(responce);
if(responce?.data?.status){
  Navigate('/')
}else{
    toast.error("user login fail")
}
     toast.success(responce?.data?.message)
 }

    }else{
        toast.error("Your google email is not veified ..")
    }
  };
  const errorMessage: any = (error: any) => {
    console.log(error);
  };

  //google end------

 

 
  

    interface ResponseData {
        email?: string;
        name?: string; 
        userId:mongoose.Schema.Types.ObjectId
      }

    //form data set in 
    const formsubmit = async(Data: LoginFormData) => {
     
      
        const responce:any=await LoginFuntion({...Data})
        if(responce.data.message){
            toast.error(responce?.data?.message)
           }else{
     
            const data:ResponseData={
             email:responce.data.email,
             name:responce.data.name,
             userId:responce.data.userId
     
            }
     
            dispatch(clearUser())
            dispatch(addUser(data))
            Navigate('/')
     
             toast.success(responce?.data?.name)

    

  
    }
}
      
   

  return (


    <>
    <div className="relative flex justify-center align-middle bg-gray-50 mt-10">


      {/* wrapper div  */}
      <div className="relative bg-amber-50 px-6 pt-10 pb-16 shadow-xl flex justify-center ring-1 w-[70vw] h-[85vh] mt-6 ring-gray-900/5 sm:mx-auto rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
        <form
          className="grid grid-cols-8 grid-rows-14 gap-3 text-center"
          onSubmit={handleSubmit(formsubmit)}
        >
          {/* header */}
          <div className="col-span-4 col-start-2 row-start-2 mt-2">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-roboto text-teal-800 text-start">
              Login
            </h1>
          </div>
         

          {/* email input */}
          <div className="col-span-8 col-start-2 col-end-8 row-start-4">
            <p className="text-start text-teal-800 font-light">email</p>
            <input
              className="p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
              placeholder="abc@gmai.com"
              type="text"
              {...register("email")}
          
            />
            <p className="text-red-600">
              {errors && errors.email && <p>{errors.email.message}</p>}
            </p>
          </div>

          {/* password input */}
          <div className="col-span-8 col-start-2 col-end-8 row-start-5 ">
            <p className="text-start text-teal-800 font-light">Password</p>
            <input
              className=" p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
              placeholder="********"
              type="text"
              {...register("password")}
            />
            <p className="text-red-600">
              {errors && errors.password && <p>{errors.password.message}</p>}
            </p>
          </div>

          {/* submit */}
          <div className="col-span-8 col-start-2 col-end-8 row-start-7">
            <button
              type="submit"
              className="py-2 px-3 flex justify-center items-center bg-teal-800 hover:bg-teal-600 focus:ring-teal-900 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
            >
             Sign in
            </button>
          </div>
          <div className="col-span-4 col-start-3 row-start-8 p-2">
            <p className="text-teal-800 font-light">or continue with</p>
          </div>
          <button onClick={handleGoogle} className="col-start-2 ml-6  row-start-9">
            {
              <div>
                 {/* <img src="/fonts/google.png" alt="G" /> */}
               
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  useOneTap
                />
              </div>
            }
          </button>
          <button
            type="button"
            // onClick={handleMainButtonClick}
            className="col-start-6 row-start-9 ml-2 "
          >
            <img className='w-[50px] h-[50px]' src="/fonts/facebook.png" alt="G" />
          </button>
          {/* {condition && (
          <FacebookLoginButton
            onLoginSuccess={handleLoginSuccess}
            onLoginFailure={handleLoginFailure}
          />
        )} */}

          {/* Create account */}
          <div className="col-span-4 col-start-2 row-start-10">
          <Link to={'/signUp'}>
          <p className="text-teal-800 font-roboto font-light text-sm whitespace-nowrap ml-8 mt-5 ">
                Don't have an account ? <span className="whitespace-nowrap font-medium"> Register free </span>
              </p>
            </Link>
          </div>
        </form>

      </div>
    </div>
  </>



  )

    }


export default Login;

