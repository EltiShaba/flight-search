import React, { useState } from 'react';
import styles from './styles.module.scss'
import Modal from '../Modal/Modal';
import { useSelector } from 'react-redux';


interface Flight {
    number: string;
    departure: {
      at: string; 
    };
    arrival: {
      at: string;
    };
    duration: string;
    numberOfStops: number;
  }
interface SegmentsResultProps {
    price: number;
    flight: Flight | null;
    key?: number;
    airline: object;
    
}

const Segments = ({ key, airline, price, flight }: SegmentsResultProps) => {   

  const { carriers } = airline;
  const selectedAirline = Object.keys(carriers)[0];
  const operatingAirline = carriers[selectedAirline]
  const flightData = useSelector(state => state.flightSearchResult);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
  
  const getPriceColor = (price: number) => {
    if (price < 100) return 'green';
    if (price >= 100 && price <= 250) return 'yellow';
    return 'red';
  };

  const handleFlightSelect = () => {
    // console.log("checking flight", flight)
    // console.log("checking flight 2", flightData)

    // flightData.data.map((data, i) => {
    //   console.log("data 1", data.id)
    //   console.log("data 2", flight.id)
    //   if(data.id === flight.id) {
    //     const amenitiesArray = data.travelerPricings[0].fareDetailsBySegment[0].amenities;
    //     console.log("amenitiesArray",amenitiesArray);

    //   }
    // })
  };

  const arrivalTime =  flight.arrival.at ? new Date(flight.arrival.at ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const departureTime =  flight.departure.at ? new Date(flight.departure.at ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div key={key} className={styles.card}>
        <div className='flex'>
            <p>Flight nr:</p>
            &nbsp;
            <p className='font-bold'>{flight.number}</p>
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
            <p className='font-bold'>{flight.duration}</p>
        </div>
        
        <div className='flex'>
            <p>Number of Stops: </p>
            &nbsp;
            <p className='font-bold'>{flight.numberOfStops}</p>
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
            <button className='btn' onClick={handleFlightSelect}>Select</button>
        </div>
        {isModalOpen && <Modal flight={flight} onClose={toggleModal} />}
    </div>
  );
};

export default Segments;