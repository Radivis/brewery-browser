/*
In the ActionPanel the user can
- set a brewery as favorite
- rate the brewery
- write a comment about the brewery
*/

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Rating from '../Rating/Rating';
import useUser from '../../hooks/useUser';
import useSave from '../../hooks/useSave';

import './ActionPanel.css'
import CommentComposer from '../CommentComposer/CommentComposer';

const ActionPanel = ({ data, showDetailsLink = true }) => {
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
    const [isComposerActive, setIsComposerActive] = useState(false)


    const handleFavorite = () => {
        dispatch({
            type: 'TOGGLE_FAVORITES',
            user,
            id
        })
    }

    const toggleComposer = () => {
        setIsComposerActive(!isComposerActive)
    }

    return <>
    <div className="action-panel">
        <button className="favorite-button transparent"
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
        <Rating id={id} />
        <button className="comment-button transparent"
        onClick={toggleComposer}>
            <i className="fa-solid fa-pen"></i>
        </button>
        {showDetailsLink && <button className="transparent details-button">
            <Link to={`/details/${id}`}>
                <i className="fa-solid fa-circle-info"></i>
            </Link>
        </button>}
    </div >
    {isComposerActive && <CommentComposer id={id} toggleComposer={toggleComposer}/>}
    </>
}

export default ActionPanel