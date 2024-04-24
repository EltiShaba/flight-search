import React, { useEffect, useState } from 'react';
import TabButton from '../elements/buttons/TabButton';
import "react-datepicker/dist/react-datepicker.css";
import { FlightSearchProps } from '../../types/types'; // Create types.ts file for types
import { fetchAirports } from '../../services/AirportApiService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useDebounce from '../../utils/custom-hooks';
import DatePicker from '../elements/DatePicker';
import InputWithDropdown from '../elements/input/InputWithDropdown';
import Input from '../elements/input/Input';
import Button from '../elements/buttons/SearchButton';
import { getFlights } from '../../services/FlightService';


const FlightSearch = ({ airports, onSearch }: FlightSearchProps) => {

  // State for form fields
  const [flightType, setFlightType] = useState<'oneWay' | 'return'>('oneWay');
  // const [startDate, setStartDate] = useState(new Date());
  // const [airlinesSearch, setAirlinesSearch] = useState<string>('');
  const [airlineResponseDeparture, setAirlineResponseDeparture] = useState<string[]>([]);
  const [airlineResponseDestination, setAirlineResponseDestination] = useState<string[]>([]);

  const [selectedCabin, setSelectedCabin] = useState<string>('');
  const [numberOfTravelers, setNumberOfTravelers] = useState(0);
  const [departureAirport, setDepartureAirport] = useState<string>('');
  const [destinationAirport, setDestinationAirport] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

 
  const token = useSelector((state: RootState) => state.token.value)

  const handleTabChange = (type: 'oneWay' | 'return') => {
    setFlightType(type);
  };

  const cabin: string[] = ["class", "economy", "vip"]


  const handleTravelersChange = (value: number) => {
    setNumberOfTravelers(value);
  };

  useDebounce(async () => {
      const data = await fetchAirports(departureAirport, token);
      setAirlineResponseDeparture(data);
    }, [departureAirport], 1000
  );

  useDebounce(async () => {
    const data = await fetchAirports(destinationAirport, token);
    setAirlineResponseDestination(data);
  }, [destinationAirport], 1000
);

const handleDepartureDateChange = (date: Date | null) => {
  setDepartureDate(date);
};

const handleReturnDateChange = (date: Date | null) => {
  setReturnDate(date);
};

  const isFormValid = () => {
    return (
      departureAirport !== '' &&
      destinationAirport !== '' &&
      selectedCabin !== '' &&
      departureDate !== null &&
      numberOfTravelers !== 0 &&
      (flightType === 'oneWay' || returnDate !== null)
    );
  };

  const handleSearchFlights = () => {
    getFlights({
      token,
      departureAirport,
      destinationAirport,
      departureDate,
      returnDate,
      selectedCabin,
      numberOfTravelers,
    })
  };

  return (
    <div>
        <div className='flex'>
            <TabButton
              label="One-Way"
              active={flightType === 'oneWay'}
              onClick={() => handleTabChange('oneWay')}
            />
            <TabButton
              label="Return"
              active={flightType === 'return'}
              onClick={() => handleTabChange('return')}
            />
        </div>
        <div className='flex'>
          <InputWithDropdown value={departureAirport} setValue={setDepartureAirport} options={airlineResponseDeparture} placeHolder="From" />
          <InputWithDropdown value={destinationAirport} setValue={setDestinationAirport} options={airlineResponseDestination} placeHolder="To" />
          {flightType === 'oneWay' ? (
          <DatePicker
            selectedDate={departureDate}
            onChange={handleDepartureDateChange}
          />
        ) : (
          <>
            <DatePicker
              selectedDate={departureDate}
              onChange={handleDepartureDateChange}
            />
            <DatePicker
              selectedDate={returnDate}
              onChange={handleReturnDateChange}
            />
          </>
        )}
         <InputWithDropdown value={selectedCabin} setValue={setSelectedCabin} placeHolder='Select the flying cabin' options={cabin}/>
         <Input initialValue={numberOfTravelers} onChange={handleTravelersChange} />
         <Button onClick={handleSearchFlights} disabled={!isFormValid()} />
        </div>
      </div>
  );
};

export default FlightSearch;
