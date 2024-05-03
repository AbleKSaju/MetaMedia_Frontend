import { useState } from "react";
import { UserCheck, MessageCircleHeart, BookUser } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ChooseInterestFunction } from "../../utils/api/methods";

const ChooseInterest = () => {
  console.log("Enter to ChooseInterest");

  const Navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageClick = (imageName: string) => {
    const newSelectedImages = selectedImages.includes(imageName)
      ? selectedImages.filter((name) => name !== imageName)
      : [...selectedImages, imageName];

    if (newSelectedImages.length > 5) {
      toast.error("You can choose at most 5 interests.");
    } else {
      setSelectedImages(newSelectedImages);
    }
  };

  const handleNext = async (e: any) => {
    e.preventDefault();

    if (selectedImages.length < 2) {
      toast.error("Choose atleat 2 interests.");
    } else {
      console.log(selectedImages, "PPP");
      const response: any = await ChooseInterestFunction(selectedImages);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        Navigate("/addprofile");
      } else {
        toast.error(response?.data?.message);
      }
    }
  };

  return (
    <div className="h-[96vh] w-[100vw] overflow-hidden ">
      <div className="flex flex-col">
        <div className="flex justify-around mt-5 sm:mt-10">
          <div>
            <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-[#C1506D] rounded-full overflow-hidden">
              <UserCheck className="w-8 h-8 sm:w-12 sm:h-12" color="white" />
            </div>
            <p className="ml-3 mt-6 hidden sm:flex text-[#C1506D]"> Created</p>
          </div>
          <hr className="w-8 sm:w-14 mt-8 sm:mt-14  border-t-2 border-[#C1506D]" />
          <div>
            <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-[#C1506D] rounded-full overflow-hidden">
              <MessageCircleHeart
                className="w-8 h-8 sm:w-12 sm:h-12"
                color="white"
              />
            </div>
            <p className="ml-3 mt-6 hidden sm:flex text-[#C1506D]"> Interests</p>
          </div>
          <hr className="w-8 sm:w-14 mt-8 sm:mt-14  border-t-2 border-[#C1506D]" />
          <div>
            <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-[#C1506D] rounded-full overflow-hidden">
              <BookUser className="w-8 h-8 sm:w-12 sm:h-12" color="white" />
            </div>
            <p className="ml-3 mt-6 hidden sm:flex text-[#C1506D]"> Profile</p>
          </div>
        </div>

        <div className="font-bold mt-10 font-roboto text-center ">
          CHOOSE YOUR INTERESTS
        </div>
        <div className="flex flex-wrap gap-y-2 gap-x-2 sm:gap-5 md:gap-8 lg:gap-24 justify-around mt-8 lg:mt-12 w-[90%] sm:w-[80%] lg:w-[70%] self-center">
          <div className=" " onClick={() => handleImageClick("design")}>
            <div className="w-20 h-20 sm:h-24 sm:w-24 rounded-full overflow-hidden">
              <img
                src="/interest/design.jpeg"
                alt="Your Image"
                className={`sm:w-24 sm:h-24 w-20 h-20 rounded-full overflow-hidden ${
                  selectedImages.includes("design")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("design") ? "font-bold" : ""
              }`}
            >
              design
            </p>
          </div>

          <div className="" onClick={() => handleImageClick("education")}>
            <div className="w-20 h-20 sm:h-24 sm:w-24 rounded-full overflow-hidden">
              <img
                src="/interest/education.png"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("education")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("education") ? "font-bold" : ""
              }`}
            >
              education
            </p>
          </div>

          <div className="" onClick={() => handleImageClick("fitness")}>
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/fitness.webp"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("fitness")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("fitness") ? "font-bold" : ""
              }`}
            >
              fitness
            </p>
          </div>

          <div className="" onClick={() => handleImageClick("food")}>
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/food.webp"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("food")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("food") ? "font-bold" : ""
              }`}
            >
              food
            </p>
          </div>

          <div className="" onClick={() => handleImageClick("home")}>
            {" "}
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/home.jpeg"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("home")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("home") ? "font-bold" : ""
              }`}
            >
              home
            </p>
          </div>

          <div className="" onClick={() => handleImageClick("travel")}>
            {" "}
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/travel.avif"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("travel")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("travel") ? "font-bold" : ""
              }`}
            >
              travel
            </p>
          </div>
          <div className="" onClick={() => handleImageClick("gardening")}>
            {" "}
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/gardening.jpeg"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("gardening")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("gardening") ? "font-bold" : ""
              }`}
            >
              gardening
            </p>
          </div>
          <div className="" onClick={() => handleImageClick("crafts")}>
            {" "}
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/crafts.jpeg"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("crafts")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("crafts") ? "font-bold" : ""
              }`}
            >
              crafts
            </p>
          </div>
          <div
            className=""
            onClick={() => handleImageClick("hairandbeauty")}
          >
            {" "}
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/hairandbeauty.jpeg"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("hairandbeauty")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("hairandbeauty") ? "font-bold" : ""
              }`}
            >
              beauty
            </p>
          </div>

          <div className="" onClick={() => handleImageClick("cars")}>
            {" "}
            <div className="w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden">
              <img
                src="/interest/cars.jpeg"
                alt="Your Image"
                className={`w-20 h-20 sm:h-24 sm:w-24 mb-0 rounded-full overflow-hidden ${
                  selectedImages.includes("cars")
                    ? "border-4 border-[#ff4473] inset-0 bg-[#C1506D] opacity-50"
                    : ""
                }`}
              />
            </div>
            <p
              className={`w-20 text-center tebg-[#C1506D] ${
                selectedImages.includes("cars") ? "font-bold" : ""
              }`}
            >
              cars
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleNext}
            className="bg-[#EBE9EF] px-6 lg:mt-10 py-2 text-[#C1506D] font-bold rounded-full transition duration-300 ease-in-out hover:bg-[#C1506D] hover:text-white focus:outline-none "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseInterest;
