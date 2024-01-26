import Sidebar from "../../components/HomeComponent/Sidebar"




const Home=()=>{
     return (
        <>
  
  <div className="flex">

    <Sidebar/>

  <div className="h-screen flex-1 p-7 ">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>


        </>
     )
}

export default Home