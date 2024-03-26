import React, { useState } from 'react';
import ApexCharts from 'apexcharts'
import {User,Clapperboard} from 'lucide-react'
import Chart from './Graph';
const HomeComponent = () => {
  const [data, setData] = useState([]);

  return (
    <div className='w-full h-full  flex-col overflow-y-auto'>

      <div className='w-full h-[240px]  flex-none'>
        <div className='w-full h-full  gap-2 sm:gap-0 flex justify-center sm:justify-around items-center'>
          <div className='sm:block hidden'></div>
          <div className='w-5/12 sm:w-3/12 h-36 border bg-white  rounded-md shadow-lg flex flex-col  justify-center  '>
            <div className='w-full h-1/2 flex items-center justify-center gap-2'>
<div><User color='#C1506D'/></div>
<div><p className='text-[#C1506D] text-center font-semibold'>Users</p></div>
            </div>
            <div className='w-full h-1/2 flex items-start justify-center'>
<p className='text-[#C1506D] font-semibold'>50.8k</p>
            </div>


          </div>
          <div className='w-5/12 h-36 sm:w-3/12 border border-1  bg-white shadow-lg rounded-md'>
          <div className='w-full h-1/2 flex items-center justify-center gap-2'>
<div><Clapperboard color='#C1506D'/></div>
<div><p className='text-[#C1506D] text-center font-semibold'>Posts</p></div>
            </div>
            <div className='w-full h-1/2 flex items-start justify-center'>
<p className='text-[#C1506D] font-semibold'>50.8k</p>
            </div>

          </div>
          <div className='sm:block hidden'></div>
        </div>
      </div>
      <div className='w-full h-[300px] sm:h-[540px] flex-none '>
        <div className='w-full h-full  flex justify-center items-center'>
          <div className='w-10/12 h-full '>
          <Chart/>
          </div>
        </div>
      </div>
     <div className='w-full h-[400px] flex-none bg-red-400'>3</div>
    </div>
  );
};

export default HomeComponent;
