import { X } from 'lucide-react'
import React from 'react'
import HighlightSliderComponent from './HighlightSliderComponent'

const OpenHighlightComponent = ({openHighlight , setOpenHighlight, setHighlightList, setHighlightName,setDeleteHighlight}:any) => {
  return (
    <div className="fixed top-0 left-0 w-full h-[92vh] sm:h-full bg-black bg-opacity-60 z-20">
    <div className="flex justify-center w-full h-full bg-transparent">
      <div className="fixed top-0 sm:top-8 h-[637px] w-full sm:w-[600px] md:w-[700px] lg:w-[900px] md:top-10 z-30 flex justify-center border text-white bg-amber-50 rounded-lg border-teal-900">
        <div className="flex-col w-full h-full justify-center">
          <div className="w-full p-4 flex flex-col justify-center sm:border-b sm:border-b-amber-50 bg-teal-900">
            <div className="w-full h-full">
              <div className="flex justify-end">
                <X
                  className="text-amber-50"
                  onClick={() => setOpenHighlight(-1)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full h-[560px]">
            <div className="">
              <HighlightSliderComponent openHighlight={openHighlight} setOpenHighlight={setOpenHighlight} durationPerImage = {5000} setHighlightList={setHighlightList} setHighlightName={setHighlightName} setDeleteHighlight={setDeleteHighlight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OpenHighlightComponent