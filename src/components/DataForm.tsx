// src/components/DataForm.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabaseClient';

interface DataFormProps {
  onNewData: () => void;
}

const DataForm: React.FC<DataFormProps> = ({ onNewData }) => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Convert string inputs to numbers
    const numValue1 = parseFloat(value1);
    const numValue2 = parseFloat(value2);
    const numValue3 = parseFloat(value3);

    // Validate that the inputs are valid numbers
    if (isNaN(numValue1) || isNaN(numValue2) || isNaN(numValue3)) {
      setErrorMessage('Please enter valid numbers for all values.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('data')
      .insert([
        {
          value1: numValue1,
          value2: numValue2,
          value3: numValue3,
        },
      ]);

    if (error) {
      console.error('Error inserting data:', error);
      setErrorMessage('Failed to insert data. Please try again.');
    } else {
      onNewData(); // Trigger data fetch in DashboardContent
      setValue1('');
      setValue2('');
      setValue3('');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Add New Data</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          placeholder="Value 1"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Value 2"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Value 3"
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          required
        />
        <Button type="submit" variant="default" className="w-full" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default DataForm;