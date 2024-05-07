import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFlights } from '../../services/FlightService';
import { setFlightSearchResult } from '../../store/features/flightSearchResultSlice';
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import FlightList from '../FlightList/FlightList';
export const SearchResults = () => {
  const flightData = useSelector(state => state.flightSearch);
  const token = useSelector(state => state.token.value);
  const dispatch = useDispatch();

  const departureDate = flightData.departureDate;
  const returnDate = flightData.returnDate;
  const departureIataCode = flightData.departureIataCode;
  const destinationIataCode = flightData.destinationIataCode;
  const selectedCabin = flightData.selectedCabin;
  const numberOfTravelers = flightData.numberOfTravelers;

  const [flightSearchResult, setFlightSearchResult] = useState(null);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const flightSearchResult = await getFlights({
          token,
          departureDate,
          returnDate,
          departureIataCode,
          destinationIataCode,
          selectedCabin,
          numberOfTravelers,
        });
        setFlightSearchResult(flightSearchResult);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlightData();
  }, [dispatch]);

  return (
    <div className=''>
    {flightSearchResult ? (
      // <FlightList flights />
        flightSearchResult.data.map((flight, index) => (
          <div className='' key={index}>
            {flight.itineraries.map((itinerary, i) => (
              <div className='' key={i}>
                {itinerary.segments.map((segment, j) => (
                  <div className='flex justify-center' key={j}>
                    {/* Render FlightList component passing segment */}
                    <FlightList key={j} airline={flightSearchResult.dictionaries} price={flight.price.total} flight={segment} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
    ) : (
      <div>Loading...</div>
    )}
  </div>
  );
};
