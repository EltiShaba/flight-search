import { GetFlightsProps } from "../types/types";

export const getFlights = async ({
  token,
  departureDate,
  returnDate,
  departureIataCode,
  destinationIataCode,
  selectedCabin,
  numberOfTravelers,
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
        travelerType: "ADULT",
        // numberOfTravelers,
      },
    ],
    sources: ["GDS"],
    searchCriteria: {
      maxFlightOffers: 2,
      flightFilters: {
        cabinRestrictions: [
          {
            cabin: "BUSINESS",
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
    console.log("resultssssssssss", result);
    return result;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Error fetching flight offers: ${error.message}`);
  }
};
