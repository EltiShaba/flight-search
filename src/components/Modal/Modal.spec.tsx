import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import user from '@testing-library/user-event'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Modal from './Modal';
import { RootState } from '../../store/store';

//used Provider to provied the Redux store to the component
//used configureStore, a mock store to test Redux connected components

//empty intial state
const mockStore = configureStore([]);

//fill it with the mock data
const mockData: Partial<RootState> = {
  flightSearch: {
    departureAirport: 'Rome',
    destinationAirport: 'Frankfurt',
    selectedCabin: 'Economy',
    travelerType: 'Adult',
    departureDate: new Date('2024-05-22'),
    returnDate: new Date('2024-05-29'),
    departureIataCode: 'ROM',
    destinationIataCode: 'FRA',
  },
};

const flight = {
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
};

describe('render modal component', () => {
    let store: any;
    let onCloseMock: jest.Mock;

    beforeEach(() => {
      //we can simulate a part of redux state with 'mockData'
        store = mockStore(mockData);
        onCloseMock = jest.fn();
    });

    // a helper function to render the component within the Provider to simulate the Redux context
    const renderWithProvider = (ui: React.ReactElement) => {
        return render(<Provider store={store}>{ui}</Provider>);
    };

    test('renders correctly with flight details', () => {
        renderWithProvider(<Modal flight={flight} onClose={onCloseMock} />);

        expect(screen.getByText('Itinerary Details')).toBeInTheDocument();
        expect(screen.getByText('Departure City: Rome')).toBeInTheDocument();
        expect(screen.getByText('Departure Airport: Rome')).toBeInTheDocument();
        expect(screen.getByText('Arrival City: Frankfurt')).toBeInTheDocument();
        expect(screen.getByText('Arrival Airport: Frankfurt')).toBeInTheDocument();
        expect(screen.getByText('Flight Number: AA1234')).toBeInTheDocument();
    });

    test('trigger onClose when close button is clicked', () => {
        renderWithProvider(<Modal flight={flight} onClose={onCloseMock} />);

        //note: couldn't use 'user' to trigger the events, so I used fireEvent instead.
        fireEvent.click(screen.getByText('×'));
        expect(onCloseMock).toHaveBeenCalled();
    });

    test('trigger onClose when overlay is clicked', () => {
        renderWithProvider(<Modal flight={flight} onClose={onCloseMock} />);

        fireEvent.click(screen.getByText('Itinerary Details').closest('div')!);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
