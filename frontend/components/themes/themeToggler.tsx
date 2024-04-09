'use client';

import { useTheme } from 'next-themes';

const ThemeToggler = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <button
        className="rounded-md p-2 bg-gray-800 text-white"
        onClick={() => setTheme('dark')}
      >
        Set Dark Mode
      </button>

      <button
        className="rounded-md p-2 bg-gray-800 text-white"
        onClick={() => setTheme('light')}
      >
        Set Light Mode
      </button>
    </div>
  );
};

export default ThemeToggler;
