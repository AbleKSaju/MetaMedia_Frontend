


import { Chart } from "react-google-charts";
const PostMapChart=()=>{
    const data = [
        ["Country", "Popularity"],
        ["Germany", 200],
        ["United States", 300],
        ["Brazil", 400],
        ["Canada", 500],
        ["France", 600],
        ["RU", 700],
      ];
      
      const options = {
        backgroundColor: 'white', 
        datalessRegionColor: '#e5e7eb', 
        regionColor:"#C1506D"
        
      };
    return (
        <>
        <div className="w-full h-full rounded-md">
        <Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="370px"
      data={data}
      options={options}
    />
        </div>


        </>
    )
}

export default PostMapChart