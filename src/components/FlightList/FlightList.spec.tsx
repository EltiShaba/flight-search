import React from "react";
import { render, screen } from "@testing-library/react";
import FlightList from "./FlightList";
// import Segments from '../Segments/Segments';
import { FlightData } from "../../types/types";

jest.mock("../Segments/Segments", () => () => <div>Mocked Segment</div>);

const mockFlightData: FlightData = {
  meta: {
    count: 2,
  },
  data: [
    {
      id: "1",
      itineraries: [
        {
          segments: [
            {
              id: "s1",
              departure: { 
                at: '2024-05-22', 
                airport: 'Rome' 
              },
              arrival: { 
                at: '2024-05-22', 
                airport: 'Frankfurt' 
              },
              duration: '5h 30m',
              number: 'AA1234',
              numberOfStops: '0'
            },
          ],
        },
      ],
      price: { total: "100.00" },
    },
  ],
  dictionaries: {
    locations: {
      FRA: {
        cityCode: "FRA",
        countryCode: "DE",
      },
    },
    aircraft: {
      "234": "AIRBUS A319",
    },
    currencies: {
      USD: "US Dollar",
    },
    carriers: {
      AZ: "ITA AIRWAYS",
    },
  },
};

describe("FlightList Component", () => {
  test("renders correctly with flight data", () => {
    render(<FlightList flightData={mockFlightData} />);

    expect(screen.getByText("Flgiht option nr:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Mocked Segment")).toBeInTheDocument();
  });

  test("renders the correct number of flight options and segments", () => {
    render(<FlightList flightData={mockFlightData} />);

    const flightOptions = screen.getAllByText("Flgiht option nr:");
    const segments = screen.getAllByText("Mocked Segment");

    expect(flightOptions).toHaveLength(2);
    expect(segments).toHaveLength(3);
  });
});
