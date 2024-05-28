import React, { useState } from 'react';
import styles from './styles.module.scss'
import Modal from '../Modal/Modal';
import { Link } from 'react-router-dom';
import { FlightDataSegments } from '../../types/types';

interface Airline {
  carriers: {
    [key: string]: string;
  }
}

interface SegmentsResultProps {
  price: string;
  flight: FlightDataSegments;
  key?: number;
  airline: Airline;
}


const Segments = ({ key, airline, price, flight }: SegmentsResultProps) => {    

  const { carriers } = airline;
  const selectedAirline = Object.keys(carriers)[0];
  const operatingAirline = carriers[selectedAirline]
  // const flightData = useSelector(state => state.flightSearchResult);

  const [selectedFlight, setSelectedFlight] = useState<FlightDataSegments | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
  
  const getPriceColor = (priceColor: string) => {
    if (priceColor < '100') return 'green';
    if (priceColor >= '100' && priceColor <= '250') return 'yellow';
    return 'red';
  };

  const handleFlightSelect = () => {
    setSelectedFlight(flight);
  };

  const arrivalTime =  flight?.arrival.at ? new Date(flight.arrival.at ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const departureTime =  flight?.departure.at ? new Date(flight.departure.at ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div key={key} className={styles.card}>
        <div className='flex'>
            <p>Flight nr:</p>
            &nbsp;
            <p className='font-bold'>{flight?.number}</p>
        </div>
        <div className='flex'>
            <p>Departure Time:</p>
            &nbsp;
            <p className='font-bold'>{departureTime}</p>
        </div>
        <div className='flex'>
            <p>Arrival Time:</p>
            &nbsp;
            <p className='font-bold'>{arrivalTime}</p>
        </div>
        <div className='flex'>
            <p>Flight Duration:</p>
            &nbsp;
            <p className='font-bold'>{flight?.duration}</p>
        </div>
        
        <div className='flex'>
            <p>Number of Stops: </p>
            &nbsp;
            <p className='font-bold'>{flight?.numberOfStops}</p>
        </div>
        
        <div className='flex'>
            <p>Operating Airline:</p>
            &nbsp;
            <p className='font-bold'>{operatingAirline}</p>
        </div>
        
        <div className='flex'>
            <p>
            Price: <span style={{ color: getPriceColor(price) }}>{price} EUR</span>
            </p>
        </div>
        <div>
        <button className={styles.iteneraryDetails} onClick={toggleModal}><p>Itinerary Details</p></button>
        </div>
        <div className='float-right'>
          <Link to="/fare-information" onClick={handleFlightSelect} className='btn'>
            Select
          </Link>
        </div>
        {isModalOpen && <Modal flight={flight} onClose={toggleModal} />}
        {/* {selectedFlight && <FareInformation fares={selectedFlight} />} */}
    </div>
  );
};

export default Segments;