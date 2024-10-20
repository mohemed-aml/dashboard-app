// src/components/Charts.tsx
'use client';

import { Database } from '@/types/Database';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

interface ChartsProps {
  data: Database['public']['Tables']['data']['Row'][];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  // Prepare data for charts
  const ids = data.map((entry) => entry.id);
  const value1Data = data.map((entry) => entry.value1);
  const value2Data = data.map((entry) => entry.value2);
  const value3Data = data.map((entry) => entry.value3);

  // Line Chart Data
  const lineChartData = {
    labels: ids,
    datasets: [
      {
        label: 'Value 1',
        data: value1Data,
        borderColor: '#8884d8',
        backgroundColor: '#8884d8',
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ids,
    datasets: [
      {
        label: 'Value 2',
        data: value2Data,
        backgroundColor: '#82ca9d',
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ids,
    datasets: [
      {
        label: 'Value 3',
        data: value3Data,
        backgroundColor: [
          '#8884d8',
          '#82ca9d',
          '#ffc658',
          '#ff7300',
          '#00c49f',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Line Chart
        </h2>
        <Line data={lineChartData} />
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Bar Chart
        </h2>
        <Bar data={barChartData} />
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Pie Chart
        </h2>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Charts;