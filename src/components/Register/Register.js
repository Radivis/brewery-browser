import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSave from "../../hooks/useSave";

const Register = () => {
    // Save user data after registration
    useSave()

    const dispatch = useDispatch()

    const users = useSelector(state => state.users)
    const usernames = users.map(user => user.username)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [formErrorMessage, setFormErrorMessage] = useState("")

    /* map each input state variable name to the corresponding setter
    , so that I don't need to use conditional statements to get the right setter */
    const setterMap = new Map()
    setterMap.set('username', setUsername)
    setterMap.set('password', setPassword)
    setterMap.set('passwordRepeat', setPasswordRepeat)

    const validateForm = () => {
        if (username.length < 4) {
            setFormErrorMessage("Username must have at least 4 characters")
            return false
        }

        if (usernames.includes(username)) {
            setFormErrorMessage("Username already taken")
            return false
        }

        if (password.length < 8) {
            setFormErrorMessage("Password must have at least 8 characters")
            return false
        }

        if (password !== passwordRepeat) {
            setFormErrorMessage("Passwords don't match")
            return false
        }

        // All checks passed, return true to indicate successful validation
        return true
    }

    const handleChange = ev => {
        setterMap.get(ev.target.name)(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        if (validateForm()) {
            dispatch({
                type: 'REGISTER_USER',
                username,
                password,
                passwordRepeat
            })

            // reset form data
            setFormErrorMessage("")
            setUsername("")
            setPassword("")
            setPasswordRepeat("")
        }
    }

    return <form className={formErrorMessage ? "form register-form form-error"
        :
        "form register-form"}
        onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" value={username} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" value={password} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="passwordRepeat">Repeat password: </label>
            <input type="password" name="passwordRepeat" value={passwordRepeat} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
        {formErrorMessage && <div className="form-error-message">{formErrorMessage}</div>}
    </form>
}

export default Register