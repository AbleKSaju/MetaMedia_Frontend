import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line'
const Chart = () => {
  const [data,setdata]=useState([
    {
      "id": "japan",
      "color": "hsl(16, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 82
        },
        {
          "x": "helicopter",
          "y": 103
        },
        {
          "x": "boat",
          "y": 206
        },
        {
          "x": "train",
          "y": 230
        },
        {
          "x": "subway",
          "y": 236
        },
        {
          "x": "bus",
          "y": 285
        },
        {
          "x": "car",
          "y": 153
        },
        {
          "x": "moto",
          "y": 7
        },
        {
          "x": "bicycle",
          "y": 207
        },
        {
          "x": "horse",
          "y": 254
        },
        {
          "x": "skateboard",
          "y": 281
        },
        {
          "x": "others",
          "y": 66
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(96, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 235
        },
        {
          "x": "helicopter",
          "y": 237
        },
        {
          "x": "boat",
          "y": 140
        },
        {
          "x": "train",
          "y": 154
        },
        {
          "x": "subway",
          "y": 200
        },
        {
          "x": "bus",
          "y": 297
        },
        {
          "x": "car",
          "y": 165
        },
        {
          "x": "moto",
          "y": 66
        },
        {
          "x": "bicycle",
          "y": 204
        },
        {
          "x": "horse",
          "y": 47
        },
        {
          "x": "skateboard",
          "y": 14
        },
        {
          "x": "others",
          "y": 41
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(323, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 173
        },
        {
          "x": "helicopter",
          "y": 24
        },
        {
          "x": "boat",
          "y": 126
        },
        {
          "x": "train",
          "y": 112
        },
        {
          "x": "subway",
          "y": 213
        },
        {
          "x": "bus",
          "y": 281
        },
        {
          "x": "car",
          "y": 146
        },
        {
          "x": "moto",
          "y": 18
        },
        {
          "x": "bicycle",
          "y": 154
        },
        {
          "x": "horse",
          "y": 10
        },
        {
          "x": "skateboard",
          "y": 268
        },
        {
          "x": "others",
          "y": 243
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(213, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 182
        },
        {
          "x": "helicopter",
          "y": 288
        },
        {
          "x": "boat",
          "y": 52
        },
        {
          "x": "train",
          "y": 277
        },
        {
          "x": "subway",
          "y": 133
        },
        {
          "x": "bus",
          "y": 74
        },
        {
          "x": "car",
          "y": 116
        },
        {
          "x": "moto",
          "y": 62
        },
        {
          "x": "bicycle",
          "y": 131
        },
        {
          "x": "horse",
          "y": 163
        },
        {
          "x": "skateboard",
          "y": 112
        },
        {
          "x": "others",
          "y": 257
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(249, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 215
        },
        {
          "x": "helicopter",
          "y": 36
        },
        {
          "x": "boat",
          "y": 110
        },
        {
          "x": "train",
          "y": 107
        },
        {
          "x": "subway",
          "y": 188
        },
        {
          "x": "bus",
          "y": 172
        },
        {
          "x": "car",
          "y": 122
        },
        {
          "x": "moto",
          "y": 205
        },
        {
          "x": "bicycle",
          "y": 241
        },
        {
          "x": "horse",
          "y": 158
        },
        {
          "x": "skateboard",
          "y": 101
        },
        {
          "x": "others",
          "y": 84
        }
      ]
    }
  ])

  return (
    <div className='border border-[#C1506D] p-5 w-full h-full '>
     
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: ' meta reports',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />

    </div>
  );
}

export default Chart;
