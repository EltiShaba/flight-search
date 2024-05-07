// types.ts
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

// export interface FindFlightService {
//   originDestinations: {
//       id: string;
//       originLocationCode: string;
//       destinationLocationCode: string;
//       departureDateTime: {
//           date: string;
//           time: string;
//       };
//   }[];
//   travelers: {
//       id: string;
//       travelerType: string;
//   }[];
//   sources: string[];
// }


export interface GetFlightsProps {
  token: string | null;
  departureIataCode: string;
  destinationIataCode: string;
  departureDate: Date | null;
  returnDate?: Date | null;
  selectedCabin: string;
  numberOfTravelers: number;
}

// Add more types as needed for other components and services
