// src/app/page.tsx
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardContent from '@/components/DashboardContent';
import { supabaseServer } from '@/utils/supabaseServerClient';
import { Database } from '@/types/Database';

type DataRow = Database['public']['Tables']['data']['Row'];

const Dashboard = async () => {
  const { data, error } = await supabaseServer.from('data').select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error loading dashboard</p>;
  }

  return (
    <ProtectedRoute>
      <DashboardContent initialData={data as DataRow[]} />
    </ProtectedRoute>
  );
};

export default Dashboard;