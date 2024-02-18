import { ImagePlus, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

const ChooseImageComponent = ({selectedFile,setSelectedFile,setImageUrl}:any) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file:any = e?.target?.files?.[0];
    if (file) {
      
      const formData = new FormData();
      setSelectedFile(file);       
      formData.append("file", file);
    } else {
      toast.error("No file selected");
    }
    const reader:any = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
      };
    
      const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };
      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file:any = e?.dataTransfer?.files?.[0];
        if (file) {
          const formData = new FormData();
          setSelectedFile(file);          
          formData.append("file", file);
        } else {
          toast.error("No file selected");
        }
        const reader:any = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }
  return (
    <div className="flex justify-center h-[400px] md:h-[600px]">
    <div
      className="flex justify-center items-center h-full w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="rounded-lg shadow-lg w-[500px] h-[450px] flex border border-teal-900 flex-col justify-between relative p-8">
       {selectedFile && <X size={26} className="absolute right-2 top-2 text-teal-900" onClick={()=>setSelectedFile(null)}/>}
        {!selectedFile && <p className="text-center text-teal-900">Drag photos and videos here</p> }
        {!selectedFile && <ImagePlus width={80} height={200} className="self-center text-teal-900"/>}
        {selectedFile ? (
          <>
            <p className="mb-4 text-teal-900">File: {selectedFile.name}</p>
            {selectedFile.type?.startsWith("image") ? (
              <div className="flex justify-center">

                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected"
                  className=" w-72 h-80"
                />
              </div>
            ) : selectedFile.type?.startsWith("video") ? (
              <video
                src={URL.createObjectURL(selectedFile)}
                controls
                className="max-w-full h-auto"
              />
            ) : (
              <p className="text-red-800">Unsupported file type</p>
            )}
          </>
        ) : (
          <div className="flex justify-center">

          <label
            htmlFor="fileInput"
            className="cursor-pointer hover:bg-teal-600 focus:ring-teal-900 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-center bg-teal-800 bottom-0 text-white font-semibold px-1 w-40 py-2 rounded-lg"
          >
            Choose File
          </label>
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </div>
    </div>

  </div>
  )
}

export default ChooseImageComponent