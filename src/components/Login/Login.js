import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import './Login.css'

const Login = () => {

    const dispatch = useDispatch()

    const users = useSelector(state => state.users)
    const usernames = users.map(user => user.username)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formErrorMessage, setFormErrorMessage] = useState("")

    /* map each input state variable name to the corresponding setter
    , so that I don't need to use conditional statements to get the right setter */
    const setterMap = new Map()
    setterMap.set('username', setUsername)
    setterMap.set('password', setPassword)

    const validateForm = () => {
        if (!usernames.includes(username)) {
            // Username doesn't exist!
            setFormErrorMessage("Login failed")
            return false
        } else if (users.find(user => user.username === username).password !== password) {
            // Wrong password!
            setFormErrorMessage("Login failed")
            return false
        }

        // All checks passed, return true to indicate successful validation
        return true
    }

    const handleChange = ev => {
        setterMap.get(ev.target.name)(ev.target.value)
    }

    const handleLogin = ev => {
        ev.preventDefault();

        if (validateForm()) {
            dispatch({
                type: 'LOGIN',
                username,
                password
            })

            // reset form data
            setFormErrorMessage("")
            setUsername("")
            setPassword("")
        }
    }

    return <div>
        <form className={formErrorMessage ? "form login-form form-error" : "form login-form"}
            onSubmit={handleLogin}>
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" value={username} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" value={password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
            {formErrorMessage && <div className="form-error-message">{formErrorMessage}</div>}
        </form>
        <div>No user account, yet? <Link to="/register"><button>Register</button></Link></div>
    </div>
}

export default Login