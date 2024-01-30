
import Sidebar from "../../components/HomeComponent/Sidebar"
import Story from "../../components/HomeComponent/Story"




const Home=()=>{
     return (
        <>
  
  <div className="flex">

    <Sidebar/>

  <div className="h-screen flex-1 p-7 ">


    {/* story     */}
    <div className="w-full   bg-blue-300 h-56  ">
     
    <Story/>

    </div>

    {/* story     */}




<div className="flex">

{/* main post  */}
<div className="w-8/12 bg-green-200 h-[600px]">
    main
</div>
{/* main post  */}




{/* suggestions  */}
<div className="w-4/12 bg-yellow-400 h-[600px]">Suggestion</div>
{/* suggestions  */}

</div>


 </div>




    </div>
</>
     )}

export default Home