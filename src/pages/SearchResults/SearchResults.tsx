import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFlights } from '../../services/FlightService';
import { useDispatch } from 'react-redux';
import FlightList from '../../components/FlightList/FlightList';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { RotatingLines } from 'react-loader-spinner';
import styles from './styles.module.scss';
import { setFlightSearchResult } from '../../store/features/flightSearchResultSlice';

export const SearchResults = () => {
  const flightData = useSelector(state => state.flightSearch);
  const token = useSelector(state => state.token.value);
  const dispatch = useDispatch<AppDispatch>();

  const departureDate = flightData.departureDate;
  const returnDate = flightData.returnDate;
  const departureIataCode = flightData.departureIataCode;
  const destinationIataCode = flightData.destinationIataCode;
  const selectedCabin = flightData.selectedCabin;
  const travelerType = flightData.travelerType;

  const [flightResult, setFlightResult] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFlightData = async () => {
      setLoading(true);
      try {
        const flightResult = await getFlights({
          token,
          departureDate,
          returnDate,
          departureIataCode,
          destinationIataCode,
          selectedCabin,
          travelerType,
        });
        dispatch(setFlightSearchResult(flightResult))
        setFlightResult(flightResult);
      } catch (error) {
        console.error(error);
        setError('Error fetching flight data. Please, enter the flight details first.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [dispatch, departureDate, returnDate, departureIataCode, destinationIataCode, selectedCabin, travelerType]);

  return (
    <div className={styles.errorMsgContainer}>
      {loading ? (
        <RotatingLines strokeColor="blue" />
      ) : error ? (
        <div className={styles.errorMsg}>
          <p>{error}</p>
          <Link to="/">Go back</Link>
        </div>
      ) : flightResult ? (
        <FlightList flightData={flightResult} />
      ) : null}
    </div>
  );
};
