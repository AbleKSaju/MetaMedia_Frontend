import Story from "./Story"

const MainBody=()=>{
 
    return (
<>

<div className="lg:flex lg:w-10/12 bg-blue-100 ">
{/* story */}
<div className="flex overflow-x-scroll bg-pink-600  lg:h-44 space-x-4">
{[...Array(20)].map((_, index) => (
            <Story key={index} />
          ))}
</div>

{/* constent */}

{/* <div>content</div> */}
{/* Suggestion */}

{/* <div>suggestion</div> */}



</div>

</>




    )}



    export default MainBody

