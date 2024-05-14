import React, { useState } from "react";

interface AirlineInputProps {
  value: string;
  setValue: (id: string, value: string) => void;
  options: object[];
  placeHolder: string;
  label: string;
  id: string;
  selectValue: (id: string, data: object) => void
}

const InputWithDropdown = ({
  value,
  setValue,
  options,
  label,
  placeHolder,
  id,
  selectValue
}: AirlineInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: {name: string, iataCode: string}) => {
    selectValue(id, option);
    setIsOpen(false);
  };

  const isValid = () =>
    options.some((option) => {
      return option.name?.toLowerCase() === value.toLowerCase();
    });

  return (
    <div className="mt-4">
      {label}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(id, e.target.value)}
        placeholder={placeHolder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
          !isValid() && "border-red-500"
        }`}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md">
          {options.map((option, i) => (
            <div
              key={i}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputWithDropdown;
