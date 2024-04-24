import { GetFlightsProps } from "../types/types";

export const getFlights = ({
  token,
  departureAirport,
  destinationAirport,
  departureDate,
  returnDate,
  selectedCabin,
  numberOfTravelers,
}: GetFlightsProps) => {
  const searchParams = {
    currencyCode: "USD",
    originDestinations: [
      {
        id: "1",
        originLocationCode: departureAirport,
        destinationLocationCode: destinationAirport,
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
        numberOfTravelers,
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

  fetch("https://test.api.amadeus.com/v2/shopping/flight-offers", requestOptions)
    .then((response) => response.json())
    .then((result) => console.log("result", result))
    .catch((error) => console.error(error));
};
