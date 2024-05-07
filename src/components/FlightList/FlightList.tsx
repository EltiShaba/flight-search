import React, { useState } from 'react';
import styles from './styles.module.scss'
interface FlightSearchResultProps {
    price: number;
    flight: object | null;
    key?: number;
    airline: object;
}

const FlightList = ({ key, airline, price, flight }: FlightSearchResultProps) => {   

  const { carriers } = airline;
  const selectedAirline = Object.keys(carriers)[0];
  const operatingAirline = carriers[selectedAirline]

  const [selectedFlight, setSelectedFlight] = useState(null);
  
  const getPriceColor = (price) => {
    if (price < 100) return 'green';
    if (price >= 100 && price <= 250) return 'yellow';
    return 'red';
  };

  const handleFlightSelect = () => {
    setSelectedFlight(flight);
  };

  const arrivalTime =  flight.arrival.at ? new Date(flight.arrival.at ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const departureTime =  flight.departure.at ? new Date(flight.departure.at ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className={styles.card}>
    <h3>Flight nr.{flight.number}</h3>
    <p>Departure Time: {departureTime}</p>
    <p>Arrival Time: {arrivalTime}</p>
    <p>Flight Duration: {flight.duration}</p>
    <p>Number of Stops: {flight.numberOfStops}</p>
    <p>Operating Airline: {operatingAirline}</p>
    <p>
      Price: <span style={{ color: getPriceColor(price) }}>{price} EUR</span>
    </p>
    <div>
      <h4>Itinerary Details:</h4>
    </div>
    <button onClick={handleFlightSelect}>Select</button>
  </div>
  );
};

export default FlightList;
