
import { LoginFuntion } from '../../utils/api/metords/post';
import {addUser,clearUser} from '../../utils/ReduxStore/Slice/userSlice'
import {LoginWithGoogle} from '../../utils/api/metords/post'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast } from 'sonner';
import mongoose from 'mongoose'
import { LoginFormData, useValidate } from '../../utils/formValidation/LoginValidation';
import { GoogleAuth } from '../../utils/firebase/firebase';
import React from 'react';



const Login = () => {
    

    
    const user= useSelector((state:any)=>state.user.email)
    console.log('user',user);
    const dispatch = useDispatch()
    const Navigate=useNavigate()
    
//-------------
const handleGoogle=(e:any)=>{
    e.preventDefault(); 
   const user:any= GoogleAuth()


   const datas=user.then (async(data:any)=>{

    console.log(data.user,'GGGG');
    const dat={
        profile:data.user.photoURL,
        email:data.user.email,
        name:data.user.displayName,
         isGoogle:true,
         isFacebook:false
    }

    if(data.user.emailVerified){
        const responce:any = await LoginWithGoogle(dat)
        
        if(responce){
            console.log(responce);
            if(responce.data.status){
                const data:ResponseData={
                    email:responce.data.responce.user.email,
                    name:responce.data.responce.user.name,
                    userId:responce.data.responce.user.userId,
                    profile:responce.data.responce.user.profile,
                    isGoogle:responce.data.responce.user.isGoogle,
                    isFacebook:responce.data.responce.user.isFacebook,
                }
                dispatch(clearUser())
                dispatch(addUser(data))
                Navigate('/')
                
            }else{
                toast.error("user login fail")
            }
            toast.success(responce?.data?.message)
        }
        
    }else{
        toast.error("Your google email is not veified ..")
    }   
   })
}
//-------------


const { errors, handleSubmit, register } = useValidate();
 
    interface ResponseData {
        email?: string;
        name?: string; 
        userId:mongoose.Schema.Types.ObjectId;
        profile:string,
        isGoogle:boolean,
        isFacebook:boolean
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
             userId:responce.data.userId,
             profile:responce.data.profile,
             isGoogle:responce.data.isGoogle,
             isFacebook:responce.data.isFacebook
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
            <p className="text-red-600 text-start text-xs">
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
            <p className="text-red-600 text-xs text-start">
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
          <button onClick={handleGoogle} className="col-start-3   row-start-9">
            {
              <div>
                 <img src="/fonts/google.png" alt="G" />
               
              </div>
            }
          </button>
          <button
            type="button"
           
            className="col-start-6 row-start-9  "
          >
            <img className='w-[50px] h-[50px]' src="/fonts/facebook.png" alt="G" />
          </button>
         

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

