import { useState } from "react";
import { UserCheck, MessageCircleHeart, BookUser } from "lucide-react";
import { toast } from "sonner";
import { ChooseInterestFunction } from "../../utils/api/methods/AuthService/post";
import { useNavigate } from "react-router-dom";

const ChooseInterest = () => {
  console.log("Enter to ChooseInterest");

  const Navigate = useNavigate()
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageClick = (imageName: string) => {
    const newSelectedImages = selectedImages.includes(imageName)?selectedImages.filter((name) => name !== imageName):[...selectedImages, imageName];

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
      const response:any = await ChooseInterestFunction(selectedImages)
      if(response?.data?.status){
        toast.success(response?.data?.message)
        Navigate('/addprofile')
      }else{
        toast.error(response?.data?.message)
      }
    }
  };

  return (
    <div className="h-[96vh] w-[100vw] overflow-hidden ">
      <div className="grid grid-cols-7 lg:ml-20  grid-rows-3 gap-4">
        <div className="col-start-2 row-start-2 w-10">
          <div className="w-20 h-20 flex items-center justify-center bg-teal-800 rounded-full overflow-hidden">
            <UserCheck size={50} color="white" />
          </div>
          <p className="ml-3 mt-6 text-teal-800"> Created</p>
        </div>

        <div className="col-start-5 row-start-2">
          <hr className="w-20 mt-12 border-t-2 border-teal-800" />
        </div>

        <div className="col-start-4 row-start-2">
          <div className="w-20 h-20 flex items-center justify-center bg-teal-800 rounded-full overflow-hidden">
            <MessageCircleHeart size={50} color="white" />
          </div>
          <p className="ml-4 mt-6 text-teal-800"> Intrest</p>
          <hr className="w-16 ml-2 border-t-2 border-teal-800" />
        </div>
        <div className="col-start-3 row-start-2 flex">
          <hr className="w-20 mt-12 border-t-2 border-teal-800" />
        </div>

        <div className="col-start-6 row-start-2">
          <div className="w-20 h-20 flex items-center justify-center bg-teal-800 rounded-full overflow-hidden ">
            <BookUser size={50} color="white" />
          </div>
          <p className="ml-4 mt-6 text-teal-800"> Profile</p>
        </div>

        <div className="row-start-3 col-start-3 mt-10 w-[23vw] font-bold font-roboto text-teal-800 ml-20 text-center ">
          CHOOSE YOUR INTERESTS
        </div>

        <div
          className="col-start-2 row-start-4 "
          onClick={() => handleImageClick("design")}
        >
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="/interest/design.jpeg"
              alt="Your Image"
              className={`w-20 h-20 rounded-full overflow-hidden ${
                selectedImages.includes("design")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("design") ? "font-bold" : ""
            }`}
          >
            design
          </p>
        </div>

        <div
          className="col-start-3 row-start-4"
          onClick={() => handleImageClick("education")}
        >
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="/interest/education.png"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("education")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("education") ? "font-bold" : ""
            }`}
          >
            education
          </p>
        </div>

        <div
          className="col-start-4 row-start-4"
          onClick={() => handleImageClick("fitness")}
        >
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/fitness.webp"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("fitness")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("fitness") ? "font-bold" : ""
            }`}
          >
            fitness
          </p>
        </div>

        <div
          className="col-start-5 row-start-4"
          onClick={() => handleImageClick("food")}
        >
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/food.webp"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("food")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("food") ? "font-bold" : ""
            }`}
          >
            food
          </p>
        </div>

        <div
          className="col-start-6 row-start-4"
          onClick={() => handleImageClick("home")}
        >
          {" "}
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/home.jpeg"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("home")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("home") ? "font-bold" : ""
            }`}
          >
            home
          </p>
        </div>

        <div
          className="col-start-3 row-start-5 mt-6"
          onClick={() => handleImageClick("travel")}
        >
          {" "}
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/travel.avif"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("travel")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("travel") ? "font-bold" : ""
            }`}
          >
            travel
          </p>
        </div>
        <div
          className="col-start-4 row-start-5 mt-6"
          onClick={() => handleImageClick("gardening")}
        >
          {" "}
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/gardening.jpeg"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("gardening")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("gardening") ? "font-bold" : ""
            }`}
          >
            gardening
          </p>
        </div>
        <div
          className="col-start-5 row-start-5 mt-6"
          onClick={() => handleImageClick("crafts")}
        >
          {" "}
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/crafts.jpeg"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("crafts")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("crafts") ? "font-bold" : ""
            }`}
          >
            crafts
          </p>
        </div>
        <div
          className="col-start-2 row-start-5 mt-6"
          onClick={() => handleImageClick("hairandbeauty")}
        >
          {" "}
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/hairandbeauty.jpeg"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("hairandbeauty")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("hairandbeauty") ? "font-bold" : ""
            }`}
          >
            beauty
          </p>
        </div>

        <div
          className="col-start-6 row-start-5 mt-6"
          onClick={() => handleImageClick("cars")}
        >
          {" "}
          <div className="w-20 h-20 mb-0 rounded-full overflow-hidden">
            <img
              src="/interest/cars.jpeg"
              alt="Your Image"
              className={`w-20 h-20 mb-0 rounded-full overflow-hidden ${
                selectedImages.includes("cars")
                  ? "border-2 border-teal-950 inset-0 bg-teal-800 opacity-50"
                  : ""
              }`}
            />
          </div>
          <p
            className={`w-20 text-center text-teal-800 ${
              selectedImages.includes("cars") ? "font-bold" : ""
            }`}
          >
            cars
          </p>
        </div>

        <div className="col-start-4 row-start-6">
          <button
            onClick={handleNext}
            className="bg-teal-800 px-6 py-2 text-amber-50 font-bold rounded-full transition duration-300 ease-in-out hover:bg-teal-600 hover:text-white focus:outline-none focus:ring focus:border-teal-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseInterest;
