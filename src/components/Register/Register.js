import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useSave from "../../hooks/useSave";

const Register = () => {
    // Save user data after registration
    useSave()

    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    // const currentUserId = useSelector(state => state.currentUserId)

    // let currentUserName = ""
    // if (currentUserId > 0) currentUserName = useSelector(state => {
    //     return state.users.find(user => user.id === currentUserId)
    // })

    /* map each state variable name to the corresponding setter
    , so that I don't need to use conditional statements to get the right setter */
    const setterMap = new Map()
    setterMap.set('username', setUsername)
    setterMap.set('password', setPassword)
    setterMap.set('passwordRepeat', setPasswordRepeat)

    const handleChange = ev => {
        setterMap.get(ev.target.name)(ev.target.value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        // TODO: Clear input fields

        // The return value of dispatch is just the action that is passed to it
        dispatch({
            type: 'REGISTER_USER',
            username,
            password,
            passwordRepeat
        })
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="passwordRepeat">Repeat password: </label>
            <input type="password" name="passwordRepeat" onChange={handleChange} />
        </div>
        <button onClick={handleChange}>Save</button>
    </form>
}

export default Register