import { AppDispatch } from "../store/store";
import { setToken } from "../store/features/authTokenSlice";

const API_SECRET = 'PIrOGIrAAFbArcbB';
const API_KEY = "w5xiuADAmKLxgl4BYyTmro3wBVXtg4zh";

interface TokenResponse {
  access_token: string;
}

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
    });
    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }
    const data: TokenResponse = await response.json();
    return data.access_token;
  } catch (error: any) {
    throw new Error(`Error getting access token: ${error.message}`);
  }
};

// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// const urlencoded = new URLSearchParams();
// urlencoded.append("grant_type", "client_credentials");
// urlencoded.append("client_id", "w5xiuADAmKLxgl4BYyTmro3wBVXtg4zh");
// urlencoded.append("client_secret", "PIrOGIrAAFbArcbB");

// const requestOptions: RequestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: urlencoded,
// };

// fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
//   .then((response) => response.json())
//   .then((result) => {

//     const raw = JSON.stringify({
//       "currencyCode": "USD",
//       "originDestinations": [
//         {
//           "id": "1",
//           "originLocationCode": "NYC",
//           "destinationLocationCode": "MAD",
//           "departureDateTimeRange": {
//             "date": "2024-05-01",
//             "time": "10:00:00"
//           }
//         }
//       ],
//       "travelers": [
//         {
//           "id": "1",
//           "travelerType": "ADULT"
//         }
//       ],
//       "sources": [
//         "GDS"
//       ],
//       "searchCriteria": {
//         "maxFlightOffers": 2,
//         "flightFilters": {
//           "cabinRestrictions": [
//             {
//               "cabin": "BUSINESS",
//               "coverage": "MOST_SEGMENTS",
//               "originDestinationIds": [
//                 "1"
//               ]
//             }
//           ]
//         }
//       }
//     });
//     getFlights(raw);

//   })
//   .catch((error) => console.error(error));
