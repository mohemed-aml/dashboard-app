// src/components/DataForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const DataForm = () => {
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const [value3, setValue3] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('data').insert([
      { value1, value2, value3 },
    ]);
    if (error) {
      alert('Error inserting data');
      console.error(error);
    } else {
      setValue1(0);
      setValue2(0);
      setValue3(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="data-form">
      <input
        type="number"
        value={value1}
        onChange={(e) => setValue1(Number(e.target.value))}
        placeholder="Value 1"
        required
        className="input-field"
      />
      <input
        type="number"
        value={value2}
        onChange={(e) => setValue2(Number(e.target.value))}
        placeholder="Value 2"
        required
        className="input-field"
      />
      <input
        type="number"
        value={value3}
        onChange={(e) => setValue3(Number(e.target.value))}
        placeholder="Value 3"
        required
        className="input-field"
      />
      <button type="submit" className="button">
        Add Data
      </button>
    </form>
  );
};

export default DataForm;