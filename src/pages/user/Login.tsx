console.log('hi');


const Login =()=>{
    return (
        <>
        {/* main div  */}
        <div className="relative flex min-h-screen justify-center align-middle overflow-hidden bg-gray-50 py-6 sm:py-12">

            {/* wrapper div  */}
             <div className="relative bg-amber-50 px-6 pt-10 pb-8 shadow-xl flex justify-center ring-1 w-[70vw] h-[80vh] mt-6 ring-gray-900/5 sm:mx-auto rounded-3xl sm:max-w-lg sm:rounded-xl sm:px-10">


                    <div className="grid grid-cols-5 grid-rows-12 gap-4">

                        {/* login heading  */}
                            <div className="col-span-1 col-start-1 row-start-2 ml-10">
                            <h1 className="text-teal-800 font-roboto font-medium text-4xl ">Login</h1>
                            </div>




                        {/* email input  */}

                        <div className="col-span-3 col-start-1 row-start-4 ml-10">

                        <div className="   absolute flex flex-col  ">
                            <label className="text-teal-800 font-light font-roboto" htmlFor="email">
                                Email
                            </label>
                            <input
                                name="email"
                                className="  lg:w-[24vw] lg:h-[5vh] border  border-amber-100 rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm"
                                placeholder="abc@gmai.com"
                                type="text"
                            />
                            </div>
                        </div>



                        {/* passowrd input filed */}

                        <div className="col-span-3 col-start-1 row-start-5 mt-8 ml-10">

                        <div className="  absolute flex flex-col  ">
                                <label className="text-teal-800 font-light font-roboto" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    className="  lg:w-[24vw] lg:h-[5vh] border  border-amber-100 rounded-md text-teal-800 placeholder:font-thin placeholder:text-zinc-300 placeholder:text-sm "
                                    placeholder="********"
                                    type="password"
                                />
                                </div>
                        </div>




                        {/* forget password field  */}
                        <div className="col-span-2 col-start-3 row-start-7 ml-20 ">
                            <p className="text-teal-800 whitespace-nowrap font-roboto font-thin text-sm">forget password ?</p>
                        </div>





                        {/* sign in butten  */}
                        <div className="col-span-3 col-start-1 row-start-8 ml-16 mt-5">
                            <button className="bg-teal-800 text-white font-roboto font-semibold lg:w-[20vw] lg:h-[4vh] rounded-md">Sign in </button>
                        </div>



                        {/* or continue with  */}
                        <div className="col-span-3 col-start-2 row-start-9 ml-[80px] mt-5 ">

                            <p className="font-roboto font-light text-sm text-teal-800 ">or continue with</p>

                        </div>



                    {/* continue with google or facebook */}
                        <div className="col-start-2 row-start-11">
                            <img src="" alt="" />
                        </div>




                        <div className="col-start-4 row-start-11">10</div>







                        <div className="col-span-3 col-start-2 row-start-12">11</div>
                    </div>
    



</div>
</div>
        </>
    )
}

export default Login