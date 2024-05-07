import { useEffect } from "react";
import FlightSearch from "./components/FlightSearch/FlightSearch";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { useSelector } from "react-redux";
import {
  selectCount,
  selectCountLoading,
} from "./selectors/applicationSelector";
// import { RequestOptions } from "./types/types";
// import { getFlights } from "./services/FlightService";
import { getAccessToken } from "./services/AuthService";
import { RootState } from "@reduxjs/toolkit/query";
import { getFlights } from "./services/FlightService";
import { setToken } from "./store/features/authTokenSlice";
import { fetchAirports } from "./services/AirportApiService";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Header} from "./components/Header/Header";
import {SearchResults} from "./components/SearchResults/SearchResults";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        dispatch(setToken(token));
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, [dispatch]);

  return (
    <div className="max-w-full min-h-screen bg-blue-300 main-bg">
      <BrowserRouter basename="/">
        <Header />

        <Routes>
          <Route path="/" element={<FlightSearch />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
