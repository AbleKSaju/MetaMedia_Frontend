import { X } from "lucide-react";

const AddHighlightComponent = ({
  highlightName,
  setHighlightName,
  setHighlightList,
  setAddHighlight,
}: any) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-20 bg-opacity-50">
      <div className="relative w-full max-w-[70vw] sm:max-w-[40vw] h-40 lg:h-52 bg-white border border-black rounded-lg">
        <div className="fle((x flex-col p-1">
          <button
            onClick={() => setAddHighlight(false)}
            className="flex justify-end w-full"
          >
            <X size={22} />
          </button>

          <div>
            <p className="text-center font-medium">Add Highlight</p>
          </div>
          <div className="flex justify-center mt-4 lg:mt-8">
            <input
              placeholder="highlight name"
              type="text"
              onChange={(e) => setHighlightName(e.target.value)}
              value={highlightName}
              className="border p-1 border-black font-light rounded-md md:w-72 outline-none"
            />
          </div>
          <button
            onClick={() => {
              setHighlightList(true);
              setAddHighlight(false);
            }}
            disabled={!highlightName.length}
            className={`mt-4 lg:mt-8 pt-2 lg:pt-4 w-full border-t border-t-black font-medium 
                        ${
                          !highlightName.length
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHighlightComponent;
