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
        setIsMenuActive(!isMenuActive)
    }

    return <nav className="navbar">
        <div className="container nav-container">
            <header className="navbar-header">
                <div className="hamburger-container">
                    <input className="checkbox" type="checkbox" name="" id="" checked={isMenuActive} onChange={handleChange} />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                </div>
                <div className="logo">
                    <h1><Link to="/">Brewery Browser</Link></h1>
                </div>
                {isBackendServerOnline ? (
                    <div className="login-container">
                        {currentUser ? `Hello, ${currentUser.username}!` : "Not logged in"}
                        <div>
                            {currentUser ?
                                <button onClick={handleLogout}>Logout</button>
                                : <Link to="/login"><button>Login</button></Link>}
                        </div>
                    </div>

                ) : (
                    <div className="data-server-connection">
                        <div><i className="fa-solid fa-database data-server-indicator"></i></div>
                        <div className="error-message">
                            No connection to <br />
                            user data server!
                        </div>
                    </div>
                )}
            </header>
            <main className={isMenuActive ? 'menu-items menu-items-slide-in' : 'menu-items'}>
                <li><Link to="/" onClick={() => setIsMenuActive(false)}>
                    <i className="fa-solid fa-magnifying-glass"></i> Search
                    </Link></li>
                <li><Link to="/favorites" onClick={() => setIsMenuActive(false)}>
                    <i className="fa-solid fa-star"></i> Favorites
                    </Link></li>
                <li><Link to="/rankings" onClick={() => setIsMenuActive(false)}>
                    <i className="fa-solid fa-ranking-star"></i> Rankings</Link>
                    </li>
                <li><Link to="/contact" onClick={() => setIsMenuActive(false)}>
                    <i className="fa-solid fa-id-card"></i> Contact</Link>
                    </li>
            </main>
        </div>
    </nav>
}

export default NavBar