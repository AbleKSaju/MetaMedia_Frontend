import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts'
import {User,Clapperboard, Users,Aperture,ShieldBanIcon} from 'lucide-react'
import Chart from './Graph';
import { showAllPostFuntion } from '../../utils/api/methods/PostService/get/showAllPost';
import { getAllUsersDataFunction } from '../../utils/api/methods/UserService/get';
import PostMapChart from './PostMapChart'
import UserOnlineChart from './UserOnlineChart'
const DashBoardComponent = () => {
    const [postData, setPostData]:any = useState([]);
    const [userData, setUserData]:any = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await showAllPostFuntion();
          if (response.status) {
            setPostData(response.data);
          }
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await getAllUsersDataFunction();
          if (response.status) {
            setUserData(response.data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }, []);






  return (
    <div className='w-full h-full flex  flex-col sm:flex-row overflow-y-auto '>
        {/* the side 1 part  */}
      
        <div className='w-full h-[350px] sm:w-3/12 justify-center   sm:h-full flex flex-wrap sm:flex-col items-center p-4 gap-3 flex-none'>
            {/* one small div  */}
<div className='w-32 sm:w-10/12 bg-white h-[150px] rounded-md shadow-md flex justify-between p-1 gap-1'>
<div className='w-1/2 h-full flex sm: flex-col p-1 gap-1 '>
<div className=' h-1/2 w-full flex justify-center items-center'><Users size={30} color='gray'/></div>
<div className=' h-1/2 w-full flex justify-center  items-start pt-2 '>
    <p className='font-mono text-lg font-semibold text-gray-500'>Users</p>
</div>

</div>
<div className='w-1/2 h-full  flex justify-center items-center'>
    <p className='font-mono font-semibold text-xl text-gray-500'>{userData.length}</p>
</div>

</div>
            {/* one small div  */}

   {/* one small div  */}
   <div className='w-32 sm:w-10/12 bg-white h-[150px] rounded-md shadow-md flex justify-between p-1 gap-1'>
<div className='w-1/2 h-full flex sm: flex-col p-1 gap-1 '>
<div className=' h-1/2 w-full flex justify-center items-center'><Clapperboard size={30} color='gray'/></div>
<div className=' h-1/2 w-full flex justify-center  items-start pt-2 '>
    <p className='font-mono text-lg font-semibold text-gray-500'>Posts</p>
</div>

</div>
<div className='w-1/2 h-full  flex justify-center items-center'>
    <p className='font-mono font-semibold text-xl text-gray-500'>{postData.length}</p>
</div>

</div>
            {/* one small div  */}
   {/* one small div  */}
   <div className='w-32 sm:w-10/12 bg-white h-[150px] rounded-md shadow-md flex justify-between p-1 gap-1'>
<div className='w-1/2 h-full flex sm: flex-col p-1 gap-1 '>
<div className=' h-1/2 w-full flex justify-center items-center'><Aperture size={30} color='gray' /></div>
<div className=' h-1/2 w-full flex justify-center  items-start pt-2 '>
    <p className='font-mono text-lg font-semibold text-gray-500'>Stories</p>
</div>

</div>
<div className='w-1/2 h-full  flex justify-center items-center'>
    <p className='font-mono font-semibold text-xl text-gray-500'>100</p>
</div>

</div>
            {/* one small div  */}
{/* one small div  */}
<div className='w-32 sm:w-10/12 bg-white h-[150px] rounded-md shadow-md flex justify-between p-1 gap-1'>
<div className='w-1/2 h-full flex sm: flex-col p-1 gap-1 '>
<div className=' h-1/2 w-full flex justify-center items-center'><ShieldBanIcon size={30} color='gray'/></div>
<div className=' h-1/2 w-full flex justify-center  items-start pt-2 '>
    <p className='font-mono text-lg font-semibold text-gray-500'>Reports</p>
</div>

</div>
<div className='w-1/2 h-full  flex justify-center items-center'>
    <p className='font-mono font-semibold text-xl text-gray-500'>100</p>
</div>

</div>
            {/* one small div  */}

        </div>

        {/* the side 1 part  */}


        {/* the side 2 part  */}


<div className='w-full h-[400px] sm:w-9/12 sm:h-full  flex flex-col justify-center items-center gap-4 p-4 flex-none rounded-md'>
    {/* for the users and post chart  */}
<div className='w-11/12 bg-white rounded-md h-1/2 shadow-md'>
    <Chart userData={userData} postData={postData}/>
</div>
    {/* for the users and post chart  */}

<div className='w-11/12  rounded-md h-1/2 flex justify-between items-center  gap-3 '>
<div className='w-1/2 h-full rounded-md bg-white shadow-md'>
    <PostMapChart/>
</div>
<div className='w-1/2 h-full  rounded-md bg-white shadow-md'>
    <UserOnlineChart/>
</div>
</div>



</div>
        {/* the side 2 part  */}


     
    </div>
  );
};

export default DashBoardComponent;