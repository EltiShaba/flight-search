// FlightSearchContainer.tsx
import React, { useState, useEffect } from 'react';
import FlightSearch from '../../components/FlightSearch/FlightSearch';
import { Airport } from '../../types/types'; // Create types.ts file for types
import { fetchAirports } from '../../services/AirportApiService'; // Implement AirportApiService

const FlightSearchContainer: React.FC = () => {
  // State for airports data
  const [airports, setAirports] = useState<Airport[]>([]);

  // Fetch airports data on component mount
  useEffect(() => {
    const fetchAirportData = async () => {
      try {
        const airportsData = await fetchAirports();
        setAirports(airportsData);
      } catch (error) {
        console.error('Error fetching airports data:', error);
      }
    };

    fetchAirportData();
  }, []);

  // Function to handle flight search
  const handleSearch = (formData: any) => {
    // Implement flight search functionality
    console.log('Search Form Data:', formData);
  };

  return <FlightSearch airports={airports} onSearch={handleSearch} />;
};

export default FlightSearchContainer;
