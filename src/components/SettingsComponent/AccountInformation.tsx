import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserByIdFuntion } from "../../utils/api/methods/UserService/post";
import { toast } from "sonner";

const AccountInformation = () => {
  const [user, setUser] = useState<any>();
  const userData = useSelector((state: any) => state.persisted.user.userData);
  
  useEffect(() => {
    console.log("useEffectuseEffectuseEffectuseEffect");

    (async () => {
      console.log("responseresponseresponse");

      const response:any = await getUserByIdFuntion(userData.userId);
      console.log(response, "response.dataresponse.data");
      if (response.status) {
        setUser(response.data);
      } else {
        toast.error("User Not found");
      }
    })()
  }, [])

  function convertDate(dateString: string) {
    return new Date(dateString);
  }

  function calculateAge(birthdateString: string) {
    const birthdate = new Date(birthdateString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthdate.getFullYear();
    if (
      currentDate.getMonth() < birthdate.getMonth() ||
      (currentDate.getMonth() === birthdate.getMonth() &&
        currentDate.getDate() < birthdate.getDate())
    ) {
      age--;
    }

    return age;
  }
  

  return (
    <div className="hidden sm:flex lg:ml-3 justify-center w-full overflow-hidden cursor-pointer">
      <div className="relative w-72 sm:w-[450px] md:w-[850px] h-[400px] sm:h-[500px] md:h-[700px] rounded-lg overflow-scroll scrollbar-hide">
        <div className="flex justify-around mt-10 flex-col gap-7">
          <p className="font-bold">
            Date Joined:{" "}
            <span className="font-medium">
              {" "}
              {user?.basicInformation?.createdAt &&
                convertDate(user.basicInformation.createdAt)?.toLocaleString()}
            </span>{" "}
          </p>
          <p className="font-bold">
            Name: <span className="font-medium"> {userData?.name} </span>{" "}
          </p>
          <p className="font-bold">
            Username: <span className="font-medium"> {userData?.userName} </span>{" "}
          </p>
          <p className="font-bold">
            Email: <span className="font-medium"> {userData?.email} </span>{" "}
          </p>
          <p className="font-bold">
            Mobile:{" "}
            <span className="font-medium"> {userData?.phoneNumber} </span>{" "}
          </p>
          <p className="font-bold">
            Bio: <span className="font-medium"> {userData?.bio} </span>{" "}
          </p>
          <p className="font-bold">
            Age:{" "}
            <span className="font-medium">
              {" "}
              {calculateAge(userData?.dateOfBirth)}{" "}
            </span>{" "}
          </p>
          <p className="font-bold">
            Gender: <span className="font-medium"> {userData?.gender} </span>{" "}
          </p>
          <p className="font-bold">
            Interests:{" "}
            <span className="font-medium">
              {" "}
              {userData?.interests?.map((data: string) => `${data} , `)}{" "}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
