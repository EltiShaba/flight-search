import React from 'react';

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ label, active, onClick }: TabButtonProps) => {
  return (
    <button
      className={`w-full flex-1 py-2 px-4 rounded-lg focus:outline-none ${active ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
