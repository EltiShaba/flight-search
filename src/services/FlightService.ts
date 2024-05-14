import { GetFlightsProps } from "../types/types";

export const getFlights = async ({
  token,
  departureDate,
  returnDate,
  departureIataCode,
  destinationIataCode,
  selectedCabin,
  travelerType,
}: GetFlightsProps) => {
  
  const searchParams = {
    currencyCode: "USD",
    originDestinations: [
      {
        id: "1",
        originLocationCode: departureIataCode,
        destinationLocationCode: destinationIataCode,
        departureDateTimeRange: {
          date: departureDate,
          time: "10:00:00",
        },
      },
    ],
    travelers: [
      {
        id: "1",
        travelerType: travelerType,
      },
    ],
    sources: ["GDS"],
    searchCriteria: {
      maxFlightOffers: 2,
      flightFilters: {
        cabinRestrictions: [
          {
            cabin: selectedCabin,
            coverage: "MOST_SEGMENTS",
            originDestinationIds: ["1"],
          },
        ],
      },
    },
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(searchParams),
  };
  
  try {
    const response = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers", requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch flight offers');
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error(`Error fetching flight offers: ${error.message}`);
  }
};
