import React from 'react';
import styles from './styles.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


interface ModalProps {
    flight: any;
    onClose: () => void;
}

const Modal = ({ flight, onClose }: ModalProps) => {
    const departureAirport = useSelector((state: RootState) => state.flightSearch.departureAirport);
    const destinationAirport = useSelector((state: RootState) => state.flightSearch.destinationAirport);

    const { departure, arrival, duration, number } = flight;
    const arrivalTime =  arrival.at ? new Date(arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const departureTime =  departure.at ? new Date(departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2 className='bold'>Itinerary Details</h2>
                <p>Departure Time: {departureTime}</p>
                <p>Departure City: {departureAirport}</p>
                <p>Departure Airport: {departure.airport}</p>
                <p>Arrival Time: {arrivalTime}</p>
                <p>Arrival City: {destinationAirport}</p>
                <p>Arrival Airport: {arrival.airport}</p>
                <p>Duration: {duration}</p>
                <p>Flight Number: {number}</p>
            </div>
        </div>
    );
};

export default Modal;
