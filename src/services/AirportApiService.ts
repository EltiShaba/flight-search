import { Airport } from "../types/types";

export const fetchAirports = async (searchKeyword: string, token: string|null): Promise<Airport[]> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?keyword=${searchKeyword}&subType=AIRPORT,CITY`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch airports');
    }
    const data = await response.json();
    return data.data;
  } catch (error: any) {
    throw new Error(`Error fetching airports: ${error.message}`);
  }
};
