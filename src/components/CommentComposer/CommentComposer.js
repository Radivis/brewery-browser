import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useUser from '../../hooks/useUser';
import useSave from '../../hooks/useSave';
import './CommentComposer.css'

const CommentComposer = ({ id, toggleComposer }) => {

    const minRequiredAmountOfCharacters = 150

    // Comments should be saved after being submitted!
    useSave()

    const [comment, setComment] = useState('')
    const [amountOfCharacters, setAmountOfCharacters] = useState(0)

    const dispatch = useDispatch()

    const user = useUser()

    const handleInput = ev => {
        setComment(ev.target.value)
        setAmountOfCharacters(ev.target.value.length)
    }

    const handleSubmit = ev => {
        ev.preventDefault();

        dispatch({
            type: 'ADD_COMMENT',
            user,
            id,
            comment
        })

        // Hide Composer!
        toggleComposer()
    }

    const areCharactersNotEnough = () => {
        return amountOfCharacters < minRequiredAmountOfCharacters
    }

    return <div className="comment-composer">
        <form onSubmit={handleSubmit}>
            <textarea className="comment-textarea"
            onChange={handleInput}
            placeholder="Write your comment!" />
            <div className="comment-composer-footer">
                <span>
                    {amountOfCharacters} characters {areCharactersNotEnough() && '(150 needed)'}
                </span>
                <button className="comment-submit-button"
                    type="submit"
                    disabled={areCharactersNotEnough()}>
                    Save comment
                </button>
            </div>
        </form>
    </div>
}

export default CommentComposer