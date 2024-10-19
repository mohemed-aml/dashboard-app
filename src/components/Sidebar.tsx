// components/Sidebar.tsx
'use client';

import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } bg-gray-800 h-screen transition-width duration-300`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2"
        >
          ☰
        </button>
        {/* Add navigation links here */}
      </div>
      <div className="flex-1 p-4">
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;