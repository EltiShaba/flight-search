import React, { useState } from "react";

interface TravelersInputProps {
  traveler: string[];
  onChange: (value: number) => void;
}

const Input =  ({ traveler, onChange }: TravelersInputProps) => {
  const [value, setValue] = useState(traveler[0]); // Initialize value with the first item in traveler array

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="mt-4">
      <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
        Type of traveler:
      </label>
      <select
        id="travelers"
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
      >
        {travelerType.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Input;
