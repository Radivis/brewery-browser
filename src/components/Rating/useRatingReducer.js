import { useReducer } from "react";
import { useSelector } from 'react-redux';

import useUser from "../../hooks/useUser";
import deepCopy from '../../helpers/deepCopy';

const useRatingReducer = (id, numberOfStars) => {

    const user = useUser()

    /* Takes an array of integers and fills the first "index" entries with true
    Note that the upper index is inclusive!
    */
    const fillWithTrueUpTo = (arr, index) => {
        if (index > 0) {
            for (let i = 0; i <= index; i++) arr[i] = true
        }
        return arr
    }

    // Load rating from redux store, if it exists
    const initialRating = useSelector(state => {
        const currentUser = state.users.find(_user => _user.id === user.id)
        const brewery = currentUser.breweries.find(brewery => brewery.id === id)

        if (brewery) return brewery.rating
        else return -1
    })

    const falseArray = Array(numberOfStars).fill(false)

    const initialState = {
        rating: initialRating,
        isFull: fillWithTrueUpTo(falseArray, initialRating - 1),
        isHovering: falseArray,
    }

    const ratingReducer = (state, action) => {
        switch (action.type) {
            case 'HOVER':
                {
                    const newIsHovering = initialState.isHovering
                    newIsHovering[action.index] = true
                    const newIsFull = initialState.isFull
                    fillWithTrueUpTo(newIsFull, action.index)

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
                fillWithTrueUpTo(newIsFull, state.rating - 1)

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

    return [state, ratingDispatch]
}

export default useRatingReducer