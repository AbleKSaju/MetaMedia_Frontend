import { Search, XCircle } from "lucide-react";

const SearchComponent = () => {
  return (
    <>
      <div className="hidden sm:block sm:w-5/12 md:w-5/12 lg:w-3/12 h-full bg-white rounded-md  ml-32 fixed z-20 border m-2 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col justify-center  ">
          <div className="w-full h-16  flex justify-center items-center  ">
            <div className="relative flex w-full justify-center">
              <input
                type="text"
                className="w-11/12 h-10 rounded-md pl-10 border z-10 outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex justify-between items-center pl-6 w-full gap-60">
                <div className="z-20">
                  <Search size={18} className="text-gray-500 " />
                </div>
                <div className="w-full pl-4 z-20">
                  {" "}
                  <XCircle size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-full flex flex-col p-2 gap-2">
            {/* one user serched value --- */}
            <div className="w-full h-20  flex rounded-md border">
              <div className="h-full w-3/12  flex justify-center items-center">
                <img
                  src="https://i.pinimg.com/564x/97/52/1d/97521d6ce555bb8fb717d3cff98c4008.jpg"
                  className="w-14 h-14 rounded-full object-fill  border-2  border-[#C1506D]"
                  alt=""
                />
              </div>
              <div className="h-full w-6/12 flex justify-center flex-col  ">
                <p className="font-semibold text-gray-500 text-md">_razik__</p>
                <p className="text-gray-400 text-sm pl-1">rashik</p>
              </div>

              <div className="w-3/12 flex justify-center items-center">
                <button className="w-16 h-6  rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                  Follow
                </button>
              </div>
            </div>

            {/* one user serched value --- */}
            {/* one user serched value --- */}
            <div className="w-full h-20  flex rounded-md border">
              <div className="h-full w-3/12  flex justify-center items-center">
                <img
                  src="https://i.pinimg.com/564x/97/52/1d/97521d6ce555bb8fb717d3cff98c4008.jpg"
                  className="w-14 h-14 rounded-full object-fill  border-2  border-[#C1506D]"
                  alt=""
                />
              </div>
              <div className="h-full w-6/12 flex justify-center flex-col  ">
                <p className="font-semibold text-gray-500 text-md">_razik__</p>
                <p className="text-gray-400 text-sm pl-1">rashik</p>
              </div>

              <div className="w-3/12 flex justify-center items-center">
                <button className="w-16 h-6  rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                  Follow
                </button>
              </div>
            </div>

            {/* one user serched value --- */}
            {/* one user serched value --- */}
            <div className="w-full h-20  flex rounded-md border">
              <div className="h-full w-3/12  flex justify-center items-center">
                <img
                  src="https://i.pinimg.com/564x/97/52/1d/97521d6ce555bb8fb717d3cff98c4008.jpg"
                  className="w-14 h-14 rounded-full object-fill  border-2  border-[#C1506D]"
                  alt=""
                />
              </div>
              <div className="h-full w-6/12 flex justify-center flex-col  ">
                <p className="font-semibold text-gray-500 text-md">_razik__</p>
                <p className="text-gray-400 text-sm pl-1">rashik</p>
              </div>

              <div className="w-3/12 flex justify-center items-center">
                <button className="w-16 h-6  rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                  Follow
                </button>
              </div>
            </div>

            {/* one user serched value --- */}
            {/* one user serched value --- */}
            <div className="w-full h-20  flex rounded-md border">
              <div className="h-full w-3/12  flex justify-center items-center">
                <img
                  src="https://i.pinimg.com/564x/97/52/1d/97521d6ce555bb8fb717d3cff98c4008.jpg"
                  className="w-14 h-14 rounded-full object-fill  border-2  border-[#C1506D]"
                  alt=""
                />
              </div>
              <div className="h-full w-6/12 flex justify-center flex-col  ">
                <p className="font-semibold text-gray-500 text-md">_razik__</p>
                <p className="text-gray-400 text-sm pl-1">rashik</p>
              </div>

              <div className="w-3/12 flex justify-center items-center">
                <button className="w-16 h-6  rounded-md flex justify-center items-center font-semibold text-[13px] text-[#C1506D] ">
                  Follow
                </button>
              </div>
            </div>

            {/* one user serched value --- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
