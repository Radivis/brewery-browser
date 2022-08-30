/*
In the ActionPanel the user can
- set a brewery as favorite
- rate the brewery
- write a comment about the brewery
*/

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useUser from '../../hooks/useUser';
import useSave from '../../hooks/useSave';

import './ActionPanel.css'

const ActionPanel = ({ data }) => {
    // Save brewery data of user after each action
    useSave()

    const dispatch = useDispatch()

    const user = useUser()

    const { id } = data

    const isFavorite = useSelector(state => {
        const currentUser = state.users.find(_user => _user.id === user.id)
        const brewery = currentUser.breweries.find(brewery => brewery.id === id)
        if (brewery) return brewery.isFavorite
        else return false
    })

    const [hoverFavorite, setHoverFavorite] = useState(false)


    const handleFavorite = () => {
        dispatch({
            type: 'TOGGLE_FAVORITES',
            user,
            id
        })
    }

    return <div className="action-panel">
        <button className="favorite-button"
            onClick={handleFavorite}
            onMouseEnter={() => setHoverFavorite(true)}
            onMouseLeave={() => setHoverFavorite(false)}
        >
            {isFavorite ? (
                <i className={hoverFavorite ? "fa-solid fa-heart-circle-minus" : "fa-solid fa-heart"}></i>
                ) : (
                <i className={hoverFavorite ? "fa-solid fa-heart-circle-plus" : "fa-regular fa-heart"}></i>
            )}
        </button>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-pen"></i>
    </div>
}

export default ActionPanel