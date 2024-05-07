import React from 'react';
import { getFlights } from '../../../services/FlightService';
interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const Button = ({ label, disabled }: ButtonProps) => {
  
  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md focus:outline-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
    >
    </button>
  );
};

export default Button;
