// src/components/DashboardContent.tsx
'use client';

import { useEffect, useState } from 'react';
import Charts from '@/components/Charts';
import DataForm from '@/components/DataForm';
import { supabase } from '@/utils/supabaseClient';
import { Database } from '@/types/Database';

type DataRow = Database['public']['Tables']['data']['Row'];

interface DashboardContentProps {
  initialData: DataRow[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ initialData }) => {
  const [data, setData] = useState<DataRow[]>(initialData);

  useEffect(() => {
    // Subscribe to changes in the 'data' table
    const subscription = supabase
      .channel('public:data')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'data' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchData = async () => {
    const { data: fetchedData, error } = await supabase
      .from('data')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately
    } else if (fetchedData) {
      setData(fetchedData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Charts data={data} />
        </div>
        <div className="col-span-1">
          <DataForm onNewData={() => fetchData()} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;