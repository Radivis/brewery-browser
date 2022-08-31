import React from 'react';
import { useDispatch } from 'react-redux';

import useUser from '../../hooks/useUser';
import useSave from '../../hooks/useSave';
import useRatingReducer from './useRatingReducer';

import './Rating.css'

const Rating = ({ id }) => {

    // Save rating to store.json after change!
    useSave()

    const user = useUser()

    const dispatch = useDispatch()

    const numberOfStars = 5

    const [state, ratingDispatch] = useRatingReducer(id, numberOfStars)

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