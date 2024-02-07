import useMediaQuery from "../../utils/costumHook/mediaqueri";

const StoryCard = () => {

    const isMobile = useMediaQuery("(max-width: 768px)"); 
  return (
    <>
      <div className="flex-none  px-2 scrollbar-hide ">
        <div className="flex flex-col items-center justify-center gap-x-5 w-36  h-40">
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-6 sm:py-12 scrollbar-hide">
            {isMobile ? (
              <div className="rounded-full h-28 w-28 bg-amber-100 flex items-center justify-center">
                <img
                  className="rounded-full h-24 w-24"
                  src="https://i.pinimg.com/564x/8c/5b/21/8c5b21a8824a4400c72d422711f32f22.jpg"
                  alt=""
                />
              </div>
            ) : (
              <div className="relative   mx-auto max-w-lg rounded-lg w-24 h-32 lg:w-32 lg:h-40">
                <div className="  w-full h-full rounded-md ">
                  <div className="w-full h-full bg-[#042F2C] relative rounded-lg ">
                    <img
                      className="h-28 w-full rounded-lg blur-[1px]"
                      src="https://i.pinimg.com/736x/f3/72/0e/f3720e26e91ec25f058f76fb769b0b10.jpg"
                      alt=""
                    />
                    <div className="rounded-full    h-16 w-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-50">
                      <img
                        className="rounded-full p-0.5  h-16 w-16 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        src="https://i.pinimg.com/564x/8c/5b/21/8c5b21a8824a4400c72d422711f32f22.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryCard;
