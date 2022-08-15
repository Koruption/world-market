import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Scatter, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker' 


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export interface ChartProps {
  labels?: string[],
  datasets: ChartDataset[]
}

export interface ChartDataset {
  label?: string;
  data: any[];
  fill?: boolean;
  borderColor?: string;
  tension?: number
}

export default function LineChart({props}: { props: ChartProps}) {
  return <Line options={options} data={props} />;
  // return <Scatter options={options} data={props} />;
  // return <Bar options={options} data={props} />;
}