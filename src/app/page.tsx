// src/app/page.tsx
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardContent from '@/components/DashboardContent';
import { supabaseServer } from '@/utils/supabaseServerClient';

const Dashboard = async () => {
  const { data, error } = await supabaseServer.from('data').select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return <p>Error loading dashboard</p>;
  }

  return (
    <ProtectedRoute>
      <DashboardContent initialData={data} />
    </ProtectedRoute>
  );
};

export default Dashboard;