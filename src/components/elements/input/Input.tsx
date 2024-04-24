import React, { useState } from "react";

interface TravelersInputProps {
  initialValue: number;
  onChange: (value: number) => void;
}

const Input =  ({ initialValue, onChange }: TravelersInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="mt-4">
      <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
        Number of Travelers:
      </label>
      <input
        type="number"
        id="travelers"
        value={value}
        onChange={handleChange}
        min={0}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default Input;
