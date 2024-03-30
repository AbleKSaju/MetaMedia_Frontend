import React, { useEffect, useState } from 'react';
import { showAllPostFuntion } from '../../utils/api/methods/PostService/get/showAllPost';
import ReactApexChart from 'react-apexcharts';
import { getAllUsersDataFunction } from '../../utils/api/methods/UserService/get';

const Chart = ({userData,postData}:any) => {
  

  const getUserCountsByMonth = () => {
    const userCounts = Array(12).fill(0); 
    userData.forEach((user:any) => {
        console.log(user,'-----------');
        
      const joinDate = new Date(user?.createdAt);
      const month = joinDate.getMonth();
      userCounts[month]++;
    });
    return userCounts;
  };

  const getPostCountsByMonth = () => {
    const postCounts = Array(12).fill(0); 
    postData.forEach((post:any) => {
      const createDate = new Date(post.createdAt);
      const month = createDate.getMonth(); 
      postCounts[month]++;
    });
    return postCounts;
  };

  const userCounts = getUserCountsByMonth();
  const postCounts = getPostCountsByMonth();

  const data = {
    series: [
      { name: 'Users', data: userCounts },
      { name: 'Posts', data: postCounts }
    ],
    options: {
      chart: { height: 350, type: 'area' },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth' },
      xaxis: {
        type: 'text',
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      tooltip: { x: { format: 'text' } },
    },
  };

  return (
    <div className='border  p-5 w-full h-full rounded-md bg-white shadow-lg '>
      {postData.length > 0 && userData.length > 0 && (
        <ReactApexChart options={data.options} series={data.series} type="area" height={330} />
      )}
    </div>
  );
}

export default Chart;
