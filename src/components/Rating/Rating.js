import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import deepCopy from '../../helpers/deepCopy';
import useUser from '../../hooks/useUser';
import useSave from '../../hooks/useSave';

import './Rating.css'

const Rating = ({ id }) => {

    // Save rating to store.json after change!
    useSave()

    const user = useUser()

    const dispatch = useDispatch()

    const numberOfStars = 5

    // Load rating from redux store, if it exists
    const initialRating = useSelector(state =>{
        const currentUser = state.users.find(_user => _user.id === user.id)
        const brewery = currentUser.breweries.find(brewery => brewery.id === id)

        if (brewery) return brewery.rating
        else return -1
    })

    /* Takes an array of integers and fills the first "index" entries with true
    Note that the upper index is inclusive!
    */
    const fillWithTrueUpTo = (arr, index) => {
        for (let i=0; i <= index; i++) arr[i] = true
    } 

    const initialState = {
        rating: initialRating || -1,
        isFull: fillWithTrueUpTo(Array(numberOfStars).fill(false), initialRating -1),
        isHovering: Array(numberOfStars).fill(false),
    }

    const ratingReducer = (state, action) => {
        switch (action.type) {
            case 'HOVER':
                {
                    const newIsHovering = initialState.isHovering
                    newIsHovering[action.index] = true
                    const newIsFull = initialState.isFull
                    fillWithTrueUpTo(newIsFull,action.index)

                    return {
                        ...state,
                        isHovering: newIsHovering,
                        isFull: newIsFull
                    }
                }

            case 'CLICK':
                {
                    const newState = deepCopy(state)
                    newState.rating = action.index + 1

                    return newState
                }

            case 'LEAVE':
                const newIsHovering = initialState.isHovering
                const newIsFull = initialState.isFull
                fillWithTrueUpTo(newIsFull,state.rating - 1)

                return {
                    ...state,
                    isHovering: newIsHovering,
                    isFull: newIsFull
                }

            default:
                return state
        }
    }

    const [state, ratingDispatch] = useReducer(ratingReducer, initialState)

    const handleClick = (ev, index) => {
        ratingDispatch({ type: 'CLICK', index })

        if (user) {
            dispatch({
                type: 'RATE',
                user,
                id,
                rating: index + 1
            })
        }
    }

    const handleMouseEnterStar = (ev, index) => {
        ratingDispatch({ type: 'HOVER', index })
    }

    const handleMouseLeaveRating = (ev, index) => {
        ratingDispatch({ type: 'LEAVE' })
    }

    const indexArray = Array(numberOfStars).fill(0).map((value, index) => index)

    return <span className="rating"
        onMouseLeave={handleMouseLeaveRating}
    >
        {indexArray.map(index => {
            return <button className="transparent rating-star"
                onClick={ev => handleClick(ev, index)}
                onMouseEnter={ev => handleMouseEnterStar(ev, index)}
                key={index}
            >
                {state.isFull[index] ?
                    <i className="fa-solid fa-star"></i>
                    :
                    <i className="fa-regular fa-star"></i>}
            </button>
        })}
    </span>
}

export default Rating