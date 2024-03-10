import { useEffect } from "react";
import { getAllUsersFunction } from "../../utils/api/methods/UserService/get";

const UsersListComponent = () => {

    useEffect(() => {
        (async () => {
            const response = await get();
                console.log(response,"responseresponseresponseresponseresponseresponse");

        //     if (response.data.status) {
        //     const data=response?.data?.data
        //     const addedStoryUrls = addedHighLightData.map((val: any) => val.media).flat();
        //     const filteredHighLightData = data.filter((dataItem:any) => !addedStoryUrls.includes(dataItem.storyUrl));
        //     setHighLightData(filteredHighLightData)
        //   } else {
        //     setHighLightData([]);
        //   }
        })();
      }, []);
      

    useEffect(() => {
        (async () => {
          console.log("getStoriesFunction");
        //   const response = await getAllUsersFunction();
        //   console.log(response,"responseresponseresponseresponseresponseresponse");
        })();
      }, []);

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full md:block">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold text-black">Sufyan</p>
                      <p className="text-xs text-gray-600">Developer</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-ms font-semibold border">22</td>
                <td className="px-4 py-3 text-xs border">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Acceptable{" "}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm border">6/4/2000</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold text-black">Stevens</p>
                      <p className="text-xs text-gray-600">Programmer</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-md font-semibold border">27</td>
                <td className="px-4 py-3 text-xs border">
                  <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-gray-100 rounded-sm">
                    {" "}
                    Pending{" "}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm border">6/10/2020</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Nora</p>
                      <p className="text-xs text-gray-600">Designer</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-md font-semibold border">17</td>
                <td className="px-4 py-3 text-xs border">
                  <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                    {" "}
                    Nnacceptable{" "}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm border">6/10/2020</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Ali</p>
                      <p className="text-xs text-gray-600">Programmer</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border text-md font-semibold">23</td>
                <td className="px-4 py-3 border text-xs">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Acceptable{" "}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">6/10/2020</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Khalid</p>
                      <p className="text-xs text-gray-600">Designer</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border text-md font-semibold">20</td>
                <td className="px-4 py-3 border text-xs">
                  <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-sm">
                    {" "}
                    Pending{" "}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">6/10/2020</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Nasser</p>
                      <p className="text-xs text-gray-600">Pen Tester</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border text-md font-semibold">29</td>
                <td className="px-4 py-3 border text-xs">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Acceptable{" "}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">6/10/2020</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Mohammed</p>
                      <p className="text-xs text-gray-600">Web Designer</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border text-md font-semibold">38</td>
                <td className="px-4 py-3 border text-xs">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Acceptable{" "}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">6/10/2020</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Saad</p>
                      <p className="text-xs text-gray-600">Data</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border text-md font-semibold">19</td>
                <td className="px-4 py-3 border text-xs">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Acceptable{" "}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">6/10/2020</td>
              </tr>
              <tr className="text-gray-700">
                <td className="px-4 py-3 border">
                  <div className="flex items-center text-sm">
                    <div className="relative w-10 h-10 mr-3 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">Sami</p>
                      <p className="text-xs text-gray-600">Developer</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border text-md font-semibold">21</td>
                <td className="px-4 py-3 border text-xs">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Acceptable{" "}
                  </span>
                </td>
                <td className="px-4 py-3 border text-sm">6/10/2020</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UsersListComponent;
