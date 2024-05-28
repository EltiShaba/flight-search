export interface Airport {
  code: string;
  name: string;
}
  
export interface FlightSearchProps {
  airports: Airport[];
  onSearch: (formData: FlightFormData) => void;
}

export interface FlightFormData {
  departureAirport: string;
  destinationAirport: string;
  departureDate: Date;
  returnDate: Date | null;
  flightClass: string;
  numberOfTravelers: number;
}

export interface FlightData {
  meta: {
    count: number;
  };
  data: {
    itineraries: {
      segments: object[]
    }[];
    price: { 
      total: string 
    },
    id: string;
  }[];
  dictionaries: {
    locations: {
      [key: string]: {
        cityCode: string;
        countryCode: string;
      };
    };
    aircraft: {
      [key: string]: string;
    };
    currencies: {
      [key: string]: string;
    };
    carriers: {
      [key: string]: string;
    };
  };
}

export interface GetFlightsProps {
  token: string | null;
  departureIataCode: string;
  destinationIataCode: string;
  departureDate: Date | null;
  returnDate?: Date | null;
  selectedCabin: string;
  travelerType: string;
}
export interface FlightDataSegments {
  arrival: {
    at: string;
    airport: string;
  };
  departure: {
    at: string;
    airport: string;
  };
  duration: string;
  number: string;
  numberOfStops: string;
}