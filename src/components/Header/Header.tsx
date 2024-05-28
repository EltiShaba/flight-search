import React from 'react'
import { Link } from 'react-router-dom';
import styles from './styles.module.scss'

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
        <nav className="p-5">
            <ul className="m-0 p-0 flex justify-center items-center align-center gap-4">
                <li className='font-bold'>
                    <Link to="/">Home</Link>
                </li>
                <li className='font-bold'>
                    <Link to="/search-results">Search Results</Link>
                </li>
                <li className='font-bold'>
                    <Link to="/fare-information">Fare Information</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
