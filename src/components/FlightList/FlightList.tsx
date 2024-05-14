import React, { useState } from 'react';
import styles from './styles.module.scss';
import Segements from '../Segments/Segments';
import { FlightData } from '../../types/types';


interface FlightSearchResultProps {
  flightData: FlightData;
}
const FlightList = ({ flightData }: FlightSearchResultProps) => {   

  return (
    <>
    {
      flightData.data.map((flight, index) => (
          <div className={styles.border} key={index}>
            {flight.itineraries.map((itinerary, i) => (
              <div className='' key={i}>
                <div className='flex'>
                  <p className='font-bold'>Flgiht option nr: </p>
                  &nbsp;
                  <p className='font-bold'>{flight.id}</p>
                </div>
                {itinerary.segments.map((segment, j) => (
                  <div className='flex justify-center' key={j}>
                    <Segements key={j} airline={flightData.dictionaries} price={flight.price.total} flight={segment} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
    }
    </>
  );
};

export default FlightList;
