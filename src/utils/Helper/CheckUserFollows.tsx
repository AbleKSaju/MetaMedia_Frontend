export const CheckUser = async(userData:any,currentUser:any,setIsFollows:any)=>{
    const userFolowing = await userData.following.filter((data:any)=> data.userId.includes(currentUser));
  console.log(userFolowing.length,"userFolowing.length");
    if(userFolowing.length!=0){
      setIsFollows(true)
    }else{
      setIsFollows(false)
    }
  }