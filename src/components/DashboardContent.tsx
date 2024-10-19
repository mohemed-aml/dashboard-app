// src/components/DashboardContent.tsx
'use client';

import { useState } from 'react';
import Charts from '@/components/Charts';
import DataForm from '@/components/DataForm';

interface DashboardContentProps {
  initialData: any[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Charts initialData={data} />
        </div>
        <div className="col-span-1">
          <DataForm onNewData={(newData) => setData([...data, newData])} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;