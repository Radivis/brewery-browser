import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    /* map each state variable name to the corresponding setter
    , so that I don't need to use conditional statements to get the right setter */
    const setterMap = new Map()
    setterMap.set('username', setUsername)
    setterMap.set('password', setPassword)

    const handleChange = ev => {
        setterMap.get(ev.target.name)(ev.target.value)
    }

    const handleLogin = ev => {
        ev.preventDefault();

        // TODO: Clear input fields

        dispatch({
            type: 'LOGIN',
            username,
            password
        })
    }

    return <div>
        <form>
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" onChange={handleChange} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </form>
        <div>No user account, yet? <Link to="/register"><button>Register</button></Link></div>
    </div>
}

export default Login