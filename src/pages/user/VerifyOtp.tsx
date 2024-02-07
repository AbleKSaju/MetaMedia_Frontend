
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { verifyOtpFunction } from "../../utils/api/methods/AuthService/post";
import { useRegisterValidate } from "../../utils/formValidation/SignUpValidation";
import { addUser, clearUser } from "../../utils/ReduxStore/Slice/userSlice";
import { addToken } from "../..//utils/ReduxStore/Slice/tokenSlice";
import { ResponseData } from "../../utils/interface/userInterface";

const VerifyOtp: React.FC = () => {

const dispatch=useDispatch()

  const [otpNumber, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [showResendMessage, setShowResendMessage] = useState(false);
  const [focusedInput, setFocusedInput] = useState<number>(0);
  const Navigate = useNavigate();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    let countdown:any;
    const decrementTimer = () => {
      setTimer((prevTimer) => prevTimer - 1);
    };
    countdown = setInterval(decrementTimer, 1000);
    if (timer === 0) {
      setShowResendMessage(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setShowResendMessage(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otpNumber];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 3) {
      setFocusedInput(index + 1);
      if (inputRefs[index + 1]?.current) {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0 && otpNumber[index] === "") {
      setFocusedInput(index - 1);
      if (inputRefs[index - 1]?.current) {
        inputRefs[index - 1]?.current?.focus();
      }
    }
  };

  const formSumbit = async (e:any) => {
    e.preventDefault()
    const otp: any = otpNumber.join("");
    if (otp.length == 4) {
      const response: any = await verifyOtpFunction({ otp: otp });
      if (response?.data?.status) {
        const data: ResponseData = {
          email: response.data.user.email,
        name: response.data.user.name,
        userId: response.data.user._id,
        profile: response.data.user.profile,
        isGoogle: response.data.user.isGoogle,
        isFacebook: response.data.user.isFacebook,
        };
        dispatch(clearUser());
        dispatch(addUser(data));
        dispatch(addToken(response.data.accesstoken))
        toast.success(response?.data?.message);
        
        Navigate("/chooseinterest");
      }else{
        toast.error(response?.data?.message);
      }
    } else {
      toast.error("Otp required");
    }
  };
 
  return (
    <div className="relative flex justify-center align-middle overflow-hidden bg-gray-50 m-0 sm:py-12">
      <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl overflow-hidden flex justify-center ring-1 w-[100vw] h-[100vh] md:h-[80vh] ring-gray-900/5 rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">
        <form
          className="grid grid-cols-6 grid-rows-12 gap-8"
          onSubmit={formSumbit}
        >
          <div className="col-span-7  col-start-1 row-start-2 bg-red-30  text-teal-800 text-3xl">
            <h1 className="font-roboto text-4xl lg:text-5xl">
              Verification Code
            </h1>
          </div>
          <div className="row-span-2 col-span-6 col-start-1 row-start-4 text-teal-800 ">
            We have sent the verification code to your email address
          </div>
          <div className="col-start-1 row-start-7">
            <div id="otp" className="w-6 h-6 flex flex-row">
              {otpNumber.map((digit, index) => (
                <div key={index} className="ml-7 md:ml-10 lg:ml-12">
                  <input
                    ref={inputRefs[index]}
                    className="border border-teal-800 remove-arrow h-10 w-10 text-center form-control rounded"
                    maxLength={1}
                    value={digit}
                    type="number"
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-start-2 col-span-4 row-start-9">
            <button
              type="submit"
              className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-teal-800 border-none text-white text-sm shadow-sm"
            >
              Verify Account
            </button>
          </div>
          <div className="col-start-2 col-span-5 row-start-11">
            <div className="flex flex-row items-center text-sm font-medium space-x-1 text-gray-500">
              {!showResendMessage && (
                <p className="md:ml-6">{`Resend OTP in ${timer} seconds`}</p>
              )}
              {showResendMessage && (
                <p className="md:pl-4">
                  Didn't recieve code?{" "}
                  <span onClick={handleResend} className="text-teal-800">
                    Resend
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
