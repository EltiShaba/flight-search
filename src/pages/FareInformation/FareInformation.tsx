import {React, useEffect} from 'react';
import { useSelector } from 'react-redux';

export const FareInformation = (fares: object) => {
  
  console.log("fares", fares)
  return (
    <div className="fare-information">
      <h2>Fare Information</h2>
      {/* {fares.map((fare, index) => (
        <div key={index} className="fare">
          <h3>{fare.name}</h3>
          <p>Price: {fare.price}</p>
          <p>{fare.description}</p>
          <button>Select Fare</button>
        </div>
      ))} */}
    </div>
  );
};