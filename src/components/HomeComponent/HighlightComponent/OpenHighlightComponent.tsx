import { X } from 'lucide-react'
import HighlightSliderComponent from './HighlightSliderComponent'

const OpenHighlightComponent = ({openHighlight , setOpenHighlight, setHighlightList, setHighlightName,setDeleteHighlight}:any) => {
  return (
    <div className="fixed z-20 inset-0 w-full h-full backdrop-blur bg-opacity-50 bg-black flex flex-col p-5 ">
        <div className="flex justify-end">
          <X
            className="text-white  cursor-pointer"
            onClick={() => setOpenHighlight(-1)}
            />
        </div>
      <div className="w-full h-10 flex flex-col justify-center">
        <div className="flex justify-center w-full h-full ">
          <div className="h-[800px] w-[800px]">
             
              <HighlightSliderComponent openHighlight={openHighlight} setOpenHighlight={setOpenHighlight} durationPerImage = {5000} setHighlightList={setHighlightList} setHighlightName={setHighlightName} setDeleteHighlight={setDeleteHighlight} />
              </div>
        </div>
      </div>
    </div>
  )
}

export default OpenHighlightComponent