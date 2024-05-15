import { useEffect } from "react";
import FlightSearch from "./pages/FlightSearch/FlightSearch";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { getAccessToken } from "./services/AuthService";
import { setToken } from "./store/features/authTokenSlice";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Header} from "./components/Header/Header";
import {SearchResults} from "./pages/SearchResults/SearchResults";
import { FareInformation } from "./pages/FareInformation/FareInformation";

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
          <Route path="/fare-information" element={<FareInformation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
