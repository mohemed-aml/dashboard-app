// src/components/Charts.tsx
'use client';

import { memo, useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DataEntry } from '@/types/DataEntry'; // Import the DataEntry type
import { supabase } from '@/utils/supabaseClient';

interface ChartsProps {
  initialData: DataEntry[];
}

const Charts: React.FC<ChartsProps> = ({ initialData }) => {
  const [data, setData] = useState<DataEntry[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetchChartData();

    const subscription = supabase
      .channel('public:data')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'data' },
        (_payload) => {
          fetchChartData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchChartData = async () => {
    setLoading(true);
    const { data: fetchedData, error } = await supabase.from<DataEntry>('data').select('*');
    if (error) {
      console.error('Error fetching data:', error);
      setFetchError('Failed to load chart data.');
    } else {
      setData(data);
      setFetchError(null);
    }
    setLoading(false);
  };

  if (loading) {
    return <p>Loading charts...</p>;
  }

  const exportToCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      data.map((e) => Object.values(e).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'chart_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const LineChartComponent = memo(({ data }: { data: DataEntry[] }) => (
    <LineChart width={300} height={200} data={data}>
      <Line type="monotone" dataKey="value1" stroke="#8884d8" />
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
    </LineChart>
  ));

  return (
    <div className="charts-container">
      <button onClick={exportToCsv} className="button mb-4">
        Export Data as CSV
      </button>
      {fetchError && <p className="error">{fetchError}</p>}
      <LineChartComponent data={data} />

      <BarChart width={300} height={200} data={data}>
        <Bar dataKey="value2" fill="#82ca9d" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
      </BarChart>

      <PieChart width={300} height={200}>
        <Pie
          data={data}
          dataKey="value3"
          nameKey="id"
          cx="50%"
          cy="50%"
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="#8884d8" />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Charts;