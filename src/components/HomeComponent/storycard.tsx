const StoryCard = () => {
  return (
    <>
      <div className="flex-none  px-2 scrollbar-hide ">
        <div className="flex flex-col items-center justify-center gap-x-5 w-36  h-40">
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-6 sm:py-12 scrollbar-hide">
            <div className="relative   mx-auto max-w-lg rounded-lg  w-32 h-40">
              <div className="  w-full h-full rounded-md ">
                <div className="w-full h-full bg-[#042F2C] relative rounded-lg ">
                  <img
                    className="h-28 w-full rounded-lg blur-[1px]"
                    src="https://i.pinimg.com/564x/72/d2/97/72d2972b663254fe0cd6de41ae8476cd.jpg"
                    alt=""
                  />
                  <div className="rounded-full    h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-50">
                    <img
                      className="rounded-full p-0.5  h-16 w-16 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      src="https://i.pinimg.com/564x/84/3a/ce/843ace0d61b54f147cc30303b233e18c.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryCard;
