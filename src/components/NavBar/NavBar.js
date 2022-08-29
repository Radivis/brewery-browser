import React from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

import './NavBar.css';

const NavBar = () => {

    const currentUserId = useSelector(state => state.currentUserId)

    const currentUser = useSelector(state => state.users.find(user => user.id === currentUserId))

    console.log("current User");
    console.log(currentUser);


    return <div className="navbar">
        <span>{currentUser ? `Hello, ${currentUser.username}!` : "Not logged in"}</span>
        <Link to="/">Search</Link>
        {/* {!currentUser ? <Link to="/login">Login</Link> : <Link to="/change-user-data">Change user data</Link>}
        {currentUser ? <Link to="/logout">Logout</Link> : <Link to="/register">Register</Link>}
        <Link to="/highscores">Highscores</Link> */}
    </div>
}

export default NavBar