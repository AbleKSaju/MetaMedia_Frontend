import { ImagePlus, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

const ChooseImageComponent = ({selectedFile,setSelectedFile,setImageUrl}:any) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e?.target?.files?.[0];
  
    if (file) {
      const formData = new FormData();
      
      // Check file type
      const fileType = file.type.split('/')[0]; // Get the type (e.g., "image" or "video")
      const minSize = fileType === 'image' ? 5 * 1024 * 1024 : 20 * 1024 * 1024; // Minimum size in bytes
      
      if (file.size < minSize) {
        setSelectedFile(file);
        formData.append("file", file);
        const reader: any = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(`File size must be at least ${minSize / (1024 * 1024)} MB for ${fileType}s.`);
      }
    } else {
      toast.error("No file selected");
    }
  };
    
      const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };
      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file:any = e?.dataTransfer?.files?.[0];
        
        if (file) {
          const fileType = file.type.split('/')[0]; 
          const minSize = fileType === 'image' ? 5 * 1024 * 1024 : 20 * 1024 * 1024; 
          if (file.size < minSize) {
          const formData = new FormData();
          setSelectedFile(file);          
          formData.append("file", file);
          const reader: any = new FileReader();
          reader.onload = () => {
            setImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
          }else{
            toast.error(`File size must be at least ${minSize / (1024 * 1024)} MB for ${fileType}s.`);
          }
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
      <div className="rounded-lg shadow-lg w-[500px] h-[450px] flex border border-black flex-col justify-between relative p-8">
       {selectedFile && <X size={26} className="absolute right-2 top-2 text-black" onClick={()=>setSelectedFile(null)}/>}
        {!selectedFile && <p className="text-center text-black">Drag photos and videos here</p> }
        {!selectedFile && <ImagePlus width={80} height={200} className="self-center text-black"/>}
        {selectedFile ? (
          <>
            <p className="mb-4 text-black">File: {selectedFile.name}</p>
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
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 text-center bg-[#C1506D] bottom-0 text-white font-semibold px-1 w-40 py-2 rounded-lg"
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