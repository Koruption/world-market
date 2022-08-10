import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
const data = [
{ name: 'Page A', uv: 400, pv: 601},
{name: 'Page B', uv: 501, pv: 104},
{name: 'Page C', uv: 301, pv: 2042},
];

export interface LineData {
  name: string;
  dataPoints: (number | string | Date)[]
}

const parseData = (data: LineData[]) => {
  const parsed = [];
  data.forEach(dataPoint => {
    parsed.push()
  })
}


export interface ChartData {
  id: string;
  color: string;
  data: {
    x: string | number | Date;
    y: string | number | Date;
  }[]
}

export const chartData = [
  {
    "id": "japan",
    "color": "hsl(244, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 108
      },
      {
        "x": "helicopter",
        "y": 10
      },
      {
        "x": "boat",
        "y": 246
      },
      {
        "x": "train",
        "y": 39
      },
      {
        "x": "subway",
        "y": 44
      },
      {
        "x": "bus",
        "y": 11
      },
      {
        "x": "car",
        "y": 281
      },
      {
        "x": "moto",
        "y": 226
      },
      {
        "x": "bicycle",
        "y": 289
      },
      {
        "x": "horse",
        "y": 277
      },
      {
        "x": "skateboard",
        "y": 171
      },
      {
        "x": "others",
        "y": 136
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(211, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 81
      },
      {
        "x": "helicopter",
        "y": 108
      },
      {
        "x": "boat",
        "y": 137
      },
      {
        "x": "train",
        "y": 1
      },
      {
        "x": "subway",
        "y": 175
      },
      {
        "x": "bus",
        "y": 195
      },
      {
        "x": "car",
        "y": 9
      },
      {
        "x": "moto",
        "y": 223
      },
      {
        "x": "bicycle",
        "y": 162
      },
      {
        "x": "horse",
        "y": 155
      },
      {
        "x": "skateboard",
        "y": 156
      },
      {
        "x": "others",
        "y": 184
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(85, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 292
      },
      {
        "x": "helicopter",
        "y": 264
      },
      {
        "x": "boat",
        "y": 84
      },
      {
        "x": "train",
        "y": 20
      },
      {
        "x": "subway",
        "y": 248
      },
      {
        "x": "bus",
        "y": 237
      },
      {
        "x": "car",
        "y": 10
      },
      {
        "x": "moto",
        "y": 176
      },
      {
        "x": "bicycle",
        "y": 119
      },
      {
        "x": "horse",
        "y": 206
      },
      {
        "x": "skateboard",
        "y": 149
      },
      {
        "x": "others",
        "y": 35
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(28, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 187
      },
      {
        "x": "helicopter",
        "y": 105
      },
      {
        "x": "boat",
        "y": 213
      },
      {
        "x": "train",
        "y": 249
      },
      {
        "x": "subway",
        "y": 142
      },
      {
        "x": "bus",
        "y": 225
      },
      {
        "x": "car",
        "y": 167
      },
      {
        "x": "moto",
        "y": 223
      },
      {
        "x": "bicycle",
        "y": 231
      },
      {
        "x": "horse",
        "y": 13
      },
      {
        "x": "skateboard",
        "y": 139
      },
      {
        "x": "others",
        "y": 18
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(293, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 209
      },
      {
        "x": "helicopter",
        "y": 37
      },
      {
        "x": "boat",
        "y": 65
      },
      {
        "x": "train",
        "y": 99
      },
      {
        "x": "subway",
        "y": 232
      },
      {
        "x": "bus",
        "y": 119
      },
      {
        "x": "car",
        "y": 190
      },
      {
        "x": "moto",
        "y": 6
      },
      {
        "x": "bicycle",
        "y": 180
      },
      {
        "x": "horse",
        "y": 83
      },
      {
        "x": "skateboard",
        "y": 270
      },
      {
        "x": "others",
        "y": 228
      }
    ]
  }
]

// { data }: { data: ChartData[] }
export default function LChart() {
  return (
    <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="amt" stroke="#8884d8" />
    </LineChart>
  );
}