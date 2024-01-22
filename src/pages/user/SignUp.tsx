import React, { useRef, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

interface FacebookLoginButtonProps {
  onLoginSuccess: (response: any) => void;
  onLoginFailure: (response: any) => void;
}

const SignUp = () => {
  const [condition, setCondition] = useState(false);
  const facebookLoginButtonRef = useRef<any>(null);
  let [email,setEmail] = useState('')
  let [password,setPassword] = useState('')
  let [name,setName] = useState('')
  // const handleSubmit = async()=>{
  //         console.log(response.data)
  //         if(response.data.message=='success'){
  //             toast.success('Register success')
  //             navigate('/login')
  //         }
  //         toast.error(response.data.message)

  //     })
  const handleMainButtonClick = () => {
    setCondition(true);
    if (facebookLoginButtonRef.current) {
      facebookLoginButtonRef.current.click();
    }
  };
  const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
    onLoginSuccess,
    onLoginFailure,
  }) => {
    const responseFacebook = async (response: any) => {
      if (response.accessToken) {
        onLoginSuccess(response);
      } else {
        onLoginFailure(response);
      }
    };
    return (
      <FacebookLogin
        ref={facebookLoginButtonRef}
        appId="789637846262329"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps: any) => (
          <button style={{ display: "none" }} onClick={renderProps.onClick} />
        )}
      />
    );
  };

  const handleLoginSuccess = (response: any) => {
    console.log("Login Success:", response);
  };
  const handleLoginFailure = (error: any) => {
    console.error("Login Error:", error);
  };

  return (

      <div className="relative flex justify-center align-middle bg-gray-50 mt-10">
        {/* wrapper div  */}
        <div className="relative bg-amber-50 px-6 pt-10 pb-16 shadow-xl flex justify-center ring-1 w-[70vw] h-[85vh] mt-6 ring-gray-900/5 sm:mx-auto rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
          <form className="grid grid-cols-8 grid-rows-14 gap-3 text-center">
            {/* header */}
            <div className="col-span-4 col-start-2 row-start-1">
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-roboto text-teal-800 text-start">
                Sign Up
              </h1>
            </div>
            {/* name input */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-3">
              <p className="text-start text-teal-800 font-light">name</p>
              <input
                name="name"
                onChange={(e)=>setName(e.target.value)} 
                className="p-5 outline-noneborder  border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="abc"
                type="text"
              />
            </div>

            {/* email input */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-4">
              <p className="text-start text-teal-800 font-light">email</p>
              <input
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                className="p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="abc@gmai.com"
                type="text"
              />
            </div>

            {/* password input */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-5 ">
              <p className="text-start text-teal-800 font-light">Password</p>
              <input
                name="password"
                onChange={(e)=>setPassword(e.target.value)} 
                className=" p-5 outline-none border border-amber-100 h-10 w-full rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                placeholder="****"
                type="text"
              />
              <p className="text-end text-teal-800 font-light">
                forgot password?
              </p>
            </div>

            {/* submit */}
            <div className="col-span-8 col-start-2 col-end-8 row-start-6">
              <button className="w-full h-10 text-white rounded-lg bg-teal-800">
                Sign Up
              </button>
            </div>
            <div className="col-span-4 col-start-3 row-start-7 p-2">
              <p className="text-teal-800 font-light">or continue with</p>
            </div>
            <button className="col-start-3 row-start-9">
              <img src="/fonts/google.png" alt="G" />
            </button>
            <button
              type="button"
              onClick={handleMainButtonClick}
              className="col-start-6 row-start-9"
            >
              <img src="/fonts/facebook.png" alt="G" />
            </button>
            {condition && (
              <FacebookLoginButton
                onLoginSuccess={handleLoginSuccess}
                onLoginFailure={handleLoginFailure}
              />
            )}

            {/* Create account */}
            <div className="col-span-8 col-start-1 row-start-10">
              <p className="text-teal-800 font-light">
                Dont have an account yet?{" "}
                <span className="text-bold text-black text-bold">
                  Register for free
                </span>{" "}
              </p>
            </div>
          </form>
        </div>
        </div>
      

  );
};

export default SignUp;
