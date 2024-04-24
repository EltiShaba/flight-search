import React, { useState } from "react";

interface AirlineInputProps {
    value: string;
    setValue: (newValue: string) => void;
    options: string[];
    placeHolder: string;
  }
  

const InputWithDropdown = ({ value, setValue, options, placeHolder }: AirlineInputProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    //
    console.log("checking val", value)
    const handleSelect = (airlineName: string) => {
        console.log("checking value selected", airlineName)
        setValue(airlineName);
        setIsOpen(false);
    };

    // Function to check if value is selected
    const isValid = () => options.some(option =>{ 
        console.log("option selected",option)
        option === value
    });

    return (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeHolder}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${
              !isValid() && 'border-red-500' // Add red border if not valid
            }`}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
              {options.map((option, i) => (
                <div
                  key={i}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(typeof option === "string" ? option : option.name)}
                >
                  {typeof option === "string" ? option : option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

export default InputWithDropdown;
