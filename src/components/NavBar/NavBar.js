import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import useLoad from "../../hooks/useLoad";

import './NavBar.css';
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

const NavBar = () => {

    const dispatch = useDispatch()

    // Load data from store.json ONCE at initialization of NavBar!
    useLoad()

    const isBackendServerOnline = useSelector(state => state.isBackendServerOnline)

    const currentUserId = useSelector(state => state.currentUserId)

    const currentUser = useSelector(state => state.users.find(user => user.id === currentUserId))

    const [isMenuActive, setIsMenuActive] = useState(false)

    const handleLogout = ev => {
        dispatch({ type: 'LOGOUT' })
    }

    const handleChange = ev => {
        setIsMenuActive(ev.target.checked)
    }

    return <nav className="navbar">
        <div className="container nav-container">
            <div className="navbar-header">
                <div className="hamburger-container">
                    <input className="checkbox" type="checkbox" name="" id="" onChange={handleChange} />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                </div>
                <div className="logo">
                    <h1>Brewery Browser</h1>
                </div>
                <div className="login-container">
                    {currentUser ? `Hello, ${currentUser.username}!` : "Not logged in"}
                    <div>
                        {currentUser ?
                            <button onClick={handleLogout}>Logout</button>
                            : <Link to="/login"><button>Login</button></Link>}
                    </div>
                </div>
                <div className="data-server-connection">{!isBackendServerOnline ?
                    <div>
                        <i className="fa-solid fa-database data-server-indicator"></i>
                        <div className="error-message">
                            No connection to data server! <br />
                            Please (re)start server and refresh the page.
                        </div>
                    </div>
                    : ''}</div>
            </div>
            <div className={isMenuActive ? 'menu-items menu-items-slide-in' : 'menu-items'}>
                <li><Link to="/">Search</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/rankings">Rankings</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </div>
        </div>
    </nav>
}

export default NavBar