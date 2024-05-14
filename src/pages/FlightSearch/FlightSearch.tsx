import React, { useCallback, useEffect, useState } from "react";
import TabButton from "../../components/elements/buttons/TabButton";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAirports } from "../../services/AirportApiService";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import useDebounce from "../../utils/custom-hooks";
import DatePicker from "../../components/elements/DatePicker";
import InputWithDropdown from "../../components/elements/input/InputWithDropdown";
import { useDispatch } from "react-redux";
import { setData } from "../../store/features/flightSearchSlice";
import { Link } from "react-router-dom";
import styles from './styles.module.scss'

const FlightSearch = () => {
  
  const [flightType, setFlightType] = useState<"oneWay" | "return">("oneWay");
  const [airlineResponseDeparture, setAirlineResponseDeparture] = useState<string[]>([]);
  const [airlineResponseDestination, setAirlineResponseDestination] = useState<string[]>([]);

  const token = useSelector((state: RootState) => state.token.value);
  const selectedCabin = useSelector((state: RootState) => state.flightSearch.selectedCabin);
  const travelerType = useSelector((state: RootState) => state.flightSearch.travelerType);
  const departureAirport = useSelector((state: RootState) => state.flightSearch.departureAirport);
  const destinationAirport = useSelector((state: RootState) => state.flightSearch.destinationAirport);
  const departureIataCode = useSelector((state: RootState) => state.flightSearch.departureIataCode);
  const destinationIataCode = useSelector((state: RootState) => state.flightSearch.destinationIataCode);
  const departureDate = useSelector((state: RootState) => state.flightSearch.departureDate);
  const returnDate = useSelector((state: RootState) => state.flightSearch.returnDate);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (id, value) => {
    if(id === 'departureDate' || id === 'returnDate') {
      value = new Date(value).toISOString().split('T')[0];
    }
    updateData({
      [id]: value
    })
  }

  const handleSelection = (id, option) => {
    if(id === "departureAirport") {
      updateData({
        [id]: option.name,
        'departureIataCode': option.iataCode
      })
    } else if(id === "destinationAirport") {
      updateData({
        [id]: option.name,
        'destinationIataCode': option.iataCode
      })
    } else updateData({
      [id]: option.name
    })
  }

  const updateData = useCallback((data) => {
    dispatch(
      setData({
          selectedCabin,
          travelerType,
          departureAirport,
          destinationAirport,
          departureIataCode,
          destinationIataCode,
          departureDate,
          returnDate,
          ...data
        })
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCabin,
    travelerType,
    departureAirport,
    destinationAirport,
    departureIataCode,
    destinationIataCode,
    departureDate,
    returnDate])

  useEffect(() => {
    updateData({
      selectedCabin: '', 
      travelerType: '', 
      departureAirport: '', 
      destinationAirport: '', 
      departureIataCode: '', 
      destinationIataCode: '', 
      departureDate: '',
      returnDate: '',
    })
  }, [])

  const handleTabChange = (type: "oneWay" | "return") => {
    setFlightType(type);
  };

  const cabin: object[] = [
    { name: "ECONOMY", order: 2 },
    { name: "PREMIUM ECONOMY" },
    { name: "BUSINESS" },
    { name: "FIRST" }
  ];

  const travelerTypeList: object[] = [
    { name: "ADULT" },
    { name: "CHILD" },
    { name: "SENIOR" },
    { name: "YOUNG" },
    { name: "HELD INFANT" },
    { name: "SEATED INFANT" },
    { name: "STUDENT" }
  ];

  useDebounce(
    async () => {
      if(departureAirport !== "") {
        const data = await fetchAirports(departureAirport, token);
        setAirlineResponseDeparture(data);
      }
    },
    [departureAirport],
    1000
  );

  useDebounce(
    async () => {
      if(destinationAirport !== "") {
        const data = await fetchAirports(destinationAirport, token);
        setAirlineResponseDestination(data);
      }
    },
    [destinationAirport],
    1000
  );

  const isFormValid = () => {
    return (
      !!departureAirport &&
      !!destinationAirport &&
      !!selectedCabin &&
      !!departureDate &&
      !!travelerType &&
      (flightType === "oneWay" || !!returnDate)
    );
  };

  return (
    <div className={styles.center}>
      <div className="bg-white w-1/3 rounded-3xl">
        <div className="py-4 px-8 min-h-96">
          <div className="flex justify-center">
            <div className="m-5 w-full">
              <TabButton
                label="One-Way"
                active={flightType === "oneWay"}
                onClick={() => handleTabChange("oneWay")}
              />
            </div>
            <div className="m-5 w-full">
              <TabButton
                label="Return"
                active={flightType === "return"}
                onClick={() => handleTabChange("return")}
              />
            </div>
          </div>
          <div className={`flex ${styles.column}`} >
            <div className={`flex px-4 my-3 ${styles.sb}`}>
              <InputWithDropdown
                value={departureAirport}
                label={'Departure'}
                id='departureAirport'
                setValue={handleInputChange}
                selectValue={handleSelection}
                options={airlineResponseDeparture}
                placeHolder="From"
              />
              <InputWithDropdown
                label={'Destination'}
                value={destinationAirport}
                id='destinationAirport'
                setValue={handleInputChange}
                selectValue={handleSelection}
                options={airlineResponseDestination}
                placeHolder="To"
              />
            </div>
            <div className={`my-3 flex ${styles.sb}`}>
              {flightType === "oneWay" ? (
                <DatePicker
                  selectedDate={departureDate}
                  id='departureDate'
                  onChange={handleInputChange}
                />
              ) : (
                <>
                  <DatePicker
                    selectedDate={departureDate}
                    id='departureDate'
                    onChange={handleInputChange}
                  />
                  <DatePicker
                    selectedDate={returnDate}
                    id='returnDate'
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
            <div className={`my-3 px-4 flex ${styles.sb}`}>
              <InputWithDropdown
                value={selectedCabin}
                id='selectedCabin'
                setValue={handleInputChange}
                selectValue={handleSelection}
                placeHolder="Cabin..."
                options={cabin}
                label={'Select the flying cabin'}
              />
              <InputWithDropdown
              value={travelerType}
              id='travelerType'
              setValue={handleInputChange}
              selectValue={handleSelection}
              placeHolder="Traveler..."
              options={travelerTypeList}
              label="Traveler type:"
              />
            </div>
            <div className="px-4">
              <Link to="/search-results" className={`${!isFormValid() ? "pointer-events-none border-gray-400 text-gray-400" : ""} h-max w-max border rounded float-right	 p-2 inline-block border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400`}>
                Search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
