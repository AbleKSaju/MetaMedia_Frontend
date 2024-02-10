import {cloudinary} from '../../utils/Cloudinary/Cloudinary'
const SizeSelectModal=()=>{
    
    return (
        <>
       <div className="sm:grid grid-cols-12 grid-rows-12 gap-0 flex justify-center">
                <div className="sm:col-span-8 sm:row-span-8 col-start-3 sm:col-start-3 row-start-1 sm:row-start-3 border rounded-lg shadow-xl" >
                    <div className="col-span-8 col-start-1 sm:col-start-3 row-start-1 sm:row-start-3 bg-[#07312E] rounded-lg w-full h-14 sm:h-20 items-center flex justify-center">
                        <p className="text-white font-roboto text-lg font-semibold text-center">Edit </p>
                    </div>

                    <div className=" flex justify-center p-7 " >
                        
                      <img className="w-64" src="https://i.pinimg.com/564x/34/1f/62/341f62aec7deed84dbba64cc01021790.jpg" alt="" />
                       
                    </div>
                </div>
            </div>
        </>

    )
}

export default SizeSelectModal