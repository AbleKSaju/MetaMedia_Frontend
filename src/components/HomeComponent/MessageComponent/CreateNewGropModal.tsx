import { Camera, Pencil, ScrollText, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { object, string, number } from "zod";
import {
  addAdmin,
  addDescription,
  addFile,
  addTitle,
} from "../../../utils/ReduxStore/Slice/newGropSlice";
import { useDispatch, useSelector } from "react-redux";
const CreateNewGroupModal = ({ setewGroup }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const userData = useSelector((state: any) => state.persisted.user.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    // Check if all fields are filled and the selected file is not null
    setIsFormValid(!!title && !!description && !!selectedFile);
  }, [title, description, selectedFile]);

  const handleX = () => {
    setewGroup(0);
  };

  const image = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const changeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);

      try {
        // Ensure that the file object has the required properties
        if (!file.name || !file.type) {
          throw new Error("File is missing required properties");
        }

        setSelectedFile(file);
        setErrors({});
      } catch (error: any) {
        console.log(error, "THIS IS ERROR");

        setErrors({ name: "Required", type: "Required" });
      }
    }
  };

  const makeNextStep = () => {
    dispatch(addTitle(title));
    dispatch(addDescription(description));
    dispatch(addAdmin(userData.userId));
    dispatch(addFile(selectedFile));
    setewGroup(2);
  };

  return (
    <>
      <div className="bg-black w-screen h-screen fixed bg-opacity-65 backdrop-blur-[2px] z-10 flex justify-center items-center flex-col">
        <div className="bg-white border w-5/12 h-4/6 flex flex-col rounded-md">
          <div className="h-12 w-full flex justify-center items-center font-semibold border-b border-[#C1506D]">
            <div className="w-11/12 flex justify-center">New Group</div>
            <div className="flex justify-end">
              <X size={21} onClick={handleX} />
            </div>
          </div>
          <div className="w-full h-full flex flex-col p-6">
            <div className="w-full h-2/6 flex justify-center items-center">
              <div
                className="w-36 bg-pink-50 h-36 rounded-full border-[#C1506D] border flex  flex-col justify-center items-center bg-cover p-3"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/564x/31/ce/4e/31ce4ec91de94fc4aa81fbf89b07c430.jpg')",
                }}
                onClick={image}
              >
                <input
                  type="file"
                  name="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={changeProfile}
                  hidden
                />
                <Camera color="grey" className="size-7" />
                <p className="text-gray-500 text-sm">Add Group icon</p>
              </div>
            </div>
            <div className="w-full h-1/6  flex justify-center items-end p-5">
              <div className="pb-1">
                <Pencil size={20} color="grey" />
              </div>
              <input
                type="text"
                className="w-9/12 h-8 outline-none border-b p-2 border-[#C1506D]"
                placeholder="Group Title ..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="w-full h-2/6  flex justify-center items-center p-5 ">
              <div className="pb-1">
                <ScrollText size={20} color="grey" />
              </div>
              <input
                className="w-9/12 h-8 outline-none border-b p-2 border-[#C1506D]"
                placeholder="Group description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}
            </div>
            <div className="w-full p-4  flex justify-center items-center">
              {isFormValid && (
                <button
                  className="bg-[#C1506D] w-20 p-1 rounded-md text-white font-semibold"
                  onClick={makeNextStep}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewGroupModal;
