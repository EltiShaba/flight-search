import React, { useState } from 'react';

interface InputProps {
  value: string;
  id: string;
  setValue: (id: string, value: string) => void;
  placeHolder: string;
  isValid: () => boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = ({
  value,
  id,
  setValue,
  placeHolder,
  isValid,
  onFocus,
  onBlur,
}: InputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFocus = () => {
    setIsOpen(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
    if (onBlur) onBlur();
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(id, e.target.value)}
      placeholder={placeHolder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
        !isValid() && 'border-red-500'
      }`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default Input;
