import React from 'react'
import { Link } from 'react-router-dom'

export const Header = (props) => {
  return (
    <div>
        <nav className="p-5">
            <ul className="m-0 p-0 flex justify-center items-center align-center gap-4">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/search-results">Search Results</Link>
                </li>
            </ul>
        </nav>

        {props.children}
    </div>
  )
}
