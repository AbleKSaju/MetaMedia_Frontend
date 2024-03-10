import {Radio,ChevronDown,X} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {addLiveName,addLiveUser,clearLiveName,clearLiveUsers,clearLiveId,setLiveId} from '../../../utils/ReduxStore/Slice/liveSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const CreateLive = ({setIsAddLive,setIsGoLive}:any)=>{
    const user = useSelector((state: any) => state.persisted.user.userData);
   
    console.log(user,'this is users');
    
    
    const [isAudience,setIsAudience]=useState(false)
    const [selectedAudience,setSelecedAudeince]=useState('')
    const [liveTitle,setlivetitle]:any=useState('')
    const [isNext,setIsnext]=useState(false)
    const dispatch=useDispatch()
const navigate=useNavigate()

    function generateRandomID(len:number) {
        let result = '';
        const chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const maxPos = chars.length;
        len = len || 5;
      
        for (let i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
      
        return result;
      }
    const handleLiveNext=()=>{
        
        const id:any=generateRandomID(10)
        dispatch(clearLiveName())
        dispatch(addLiveName(liveTitle))
        dispatch(clearLiveUsers())
        const host:any={
            hostId:user.userId
        }
        dispatch(addLiveUser(host))
        dispatch(clearLiveId())
        dispatch(setLiveId(id))

        setIsAddLive(false)
        navigate(`room/${id}`)
        
    }

    useEffect(()=>{

        if(selectedAudience.trim()!=='' && liveTitle.trim()!==''){
            setIsnext(true)
        }

    },[selectedAudience,liveTitle])
    const selectAudience=(selected:string)=>{
       
        if(selected=='public'){
            setSelecedAudeince(selected)
            setIsAudience(false)
        }else if(selected=='privet'){
            setSelecedAudeince(selected)
            setIsAudience(false)
        }else{
            setIsAudience(false)
        }
    }



    const handleX=()=>{
        setIsAddLive(false)
    }
    return (
        <>


{/* main div  */}
<div className="fixed  z-10  w-screen h-screen bg-black bg-opacity-45  flex flex-col  items-center p-5">
<div className='w-full h-10  flex justify-end items-center p-6  '><X color='white' onClick={handleX}/></div>


{/* constent div  */}
<div className='w-full h-full flex justify-center items-center'>
<div className="w-5/12 h-4/6 bg-white border  rounded-lg flex justify-between flex-col">

    <div className="h-14  w-full flex justify-center items-center border-b">
        <p className=" text-lg font-semibold">Live</p>
    </div>

    {/* contents  */}
    <div className="h-full w-full flex justify-between flex-col  ">

        <div className="h-2/6  flex justify-center items-center">
           <Radio className='size-24'/>

        </div>
        <div className="h-3/6 flex justify-between flex-col">
            <div className='w-full h-1/6  flex justify-center items-center '>
                <p className='text-xl font-bold '>Add live video details</p>
            </div>
            <div className='w-full h-2/6  flex justify-center items-center text-center p-5'>
                <p className='text-sm text-gray-500'>Go live by connecting to your choice of streaming software. To get started, add a title and select the audience for your live video.</p>
            </div>
            <div className='w-full h-3/6 flex justify-center items-start mt-3'>
                <input type="text" className='w-6/12 border h-10 rounded-lg outline-none p-3' placeholder='Add a title ...' value={liveTitle} onChange={(e)=>setlivetitle(e.target.value)}  />
            </div>


        </div>
        
        <div className="h-2/6  flex flex-col justify-between items-center">
 <div className='w-full h-1/3 flex justify-center items-center ' >  
 
     <div className='flex justify-center items-center' onClick={()=>setIsAudience(!isAudience)}>{selectedAudience ? (<><p  className='text-gray-500 '> {selectedAudience} </p> <ChevronDown className='ml-2' size={15}/></>):(<><p  className='text-gray-500 '> Audience </p> <ChevronDown className='ml-2' size={15}/></>)} </div>
     {isAudience && (
        <>
         <div className='fixed bg-white w-1/12 h-24 rounded-lg border flex justify-between flex-col mt-32'>
     <div className='w-full h-1/3 border-b  flex justify-center items-center' onClick={()=>selectAudience('public')}><p>public</p></div>
     <div className='w-full h-1/3 border-b  flex justify-center items-center' onClick={()=>selectAudience('privet')}>privet</div>
     <div className='w-full h-1/3  flex justify-center items-center' onClick={()=>selectAudience('cancel')}>cancel</div>



    </div> 
        </>
     )}
 </div>
 <div className='w-full h-2/3 flex justify-center items-center '>{isNext ? (<><button className='h-8 w-20 border flex justify-center items-center bg-[#C1506D] rounded-lg' onClick={handleLiveNext}>next</button></>):(<></>)}   </div>

        </div>


    
    </div>
    </div>
    {/* contents  */}


</div>
{/* constent div  */}




 </div>
{/* main div  */}



        </>
    )
}
export default CreateLive