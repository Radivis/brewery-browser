import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import './NavBar.css';

const NavBar = () => {

    const dispatch = useDispatch()

    const currentUserId = useSelector(state => state.currentUserId)

    const currentUser = useSelector(state => state.users.find(user => user.id === currentUserId))

    const handleLogout = ev => {
        dispatch({type: 'LOGOUT'})
    }

    return <nav className="navbar">
        <div class="container nav-container">
            <input class="checkbox" type="checkbox" name="" id="" />
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <div class="logo">
                <h1>Brewery Browser</h1>
            </div>
            <div class="login-container">
                {currentUser ? `Hello, ${currentUser.username}!` : "Not logged in"}
                <div>
                    {currentUser ?
                    <button onClick={handleLogout}>Logout</button>
                    : <Link to="/login"><button>Login</button></Link>}
                </div>
            </div>
            <div class="menu-items">
                <li><Link to="/">Search</Link></li>
                <li><Link to="/">Favorites</Link></li>
                <li><Link to="/">Rankings</Link></li>
                <li><Link to="/">Contact</Link></li>
            </div>
        </div>
    </nav>
}

export default NavBar