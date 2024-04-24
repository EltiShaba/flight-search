import { useEffect } from "react"
import FlightSearch from "./components/FlightSearch/FlightSearch"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store/store";
import { useSelector } from "react-redux";
import { selectCount, selectCountLoading } from "./selectors/applicationSelector";
// import { RequestOptions } from "./types/types";
// import { getFlights } from "./services/FlightService";
import { getAccessToken } from "./services/AuthService";
import { RootState } from "@reduxjs/toolkit/query";
import { getFlights } from "./services/FlightService";
import { setToken } from "./store/features/authTokenSlice";
import { fetchAirports } from "./services/AirportApiService";
const App = () => {

  const dispatch = useDispatch<AppDispatch>();
  
  const params = {
    "currencyCode": "USD",
    "originDestinations": [
      {
        "id": "1",
        "originLocationCode": "NYC",
        "destinationLocationCode": "MAD",
        "departureDateTimeRange": {
          "date": "2024-05-05",
          "time": "10:00:00"
        }
      }
    ],
    "travelers": [
      {
        "id": "1",
        "travelerType": "ADULT"
      }
    ],
    "sources": [
      "GDS"
    ],
    "searchCriteria": {
      "maxFlightOffers": 2,
      "flightFilters": {
        "cabinRestrictions": [
          {
            "cabin": "BUSINESS",
            "coverage": "MOST_SEGMENTS",
            "originDestinationIds": [
              "1"
            ]
          }
        ]
      }
    }
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        dispatch(setToken(token))
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, [dispatch]);

  // Call getFlights function with token as argument
  // const handleGetFlights = () => {
  //   // Define search parameters
  //   getFlights({ searchParams: params, token }); // Pass token as argument
  // };

  // const token = useSelector((state: RootState) => state.token.value)

  // const getAirports = async () => {
  //   const data = await fetchAirports("rome", token);
  //   console.log("airports: ", data);
  // }

  return (
    <>
      <div className="m-9 container mx-auto">
        {/* <button onClick={getAirports}>Get Flights</button> Button to trigger getFlights */}
        <FlightSearch />
      </div>
    </>
  )
}

export default App
