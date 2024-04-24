// DatePicker.tsx
import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps extends ReactDatePickerProps {
//   isValid: boolean;
  placeholder?: string;
  selectedDate: Date | null;
}

const DatePicker = ({ selectedDate, onChange, placeholder }: DatePickerProps) => {
  const currentDate = new Date();
  const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  return (
    <div>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        minDate={minDate}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
          selectedDate ? '' : 'border-red-500'
        }`}
      />
      {!selectedDate && <p className="text-red-500">Invalid date selection</p>}
    </div>
  );
};

export default DatePicker;
