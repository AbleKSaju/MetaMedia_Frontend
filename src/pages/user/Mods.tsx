import React from "react";

const Mods = () => {
  return (
    <div className="flex justify-around ml-20 mt-24 flex-wrap text-teal-800 cursor-pointer">
      <div className="bg-amber-50 border-amber-100 border w-80 text-center xl:w-[420px] xl:h-[600px] h-[70vh] xl:text-2xl p-5 rounded-xl">
        <div className="bg-white border-amber-100 border py-16 rounded-xl flex justify-center text-4xl">
          META
        </div>
        <p className="mt-10">
          The metaverse is a simulated version of reality where users can come
          together, collaborate, and engage. It functions as a virtual realm
          where individuals interact using personalized avatars. This
          environment facilitates communication with customers through chat
          rooms, enabling the exchange of messages and interactive experiences.
        </p>
      </div>
      <div>
        <div className="bg-amber-50 mr-20 w-80 border-amber-100 border text-center xl:w-[420px] xl:h-[600px] h-[70vh] xl:text-2xl p-5 rounded-xl">
          <div className="bg-white py-16 border-amber-100 border rounded-xl flex justify-center text-4xl">
            NORMAL
          </div>
          <p className="mt-10">
            interactions and experiences are rooted in the physical world,
            encompassing tangible objects, face-to-face communication, and
            real-world environments. This occurs without the integration of
            virtual or augmented reality technologies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mods;
