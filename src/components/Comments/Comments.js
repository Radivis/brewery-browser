import React from 'react';
import { useSelector } from 'react-redux';

const Comments = ({id}) => {
    // First iterate through all users to get all comments for this brewery
    const users = useSelector(state => state.users)

    // Extract all comments that any user has written
    const userComments = []

    users.forEach(user => {
        const brewery = user.breweries.find(brewery => brewery.id === id)

        if (brewery && brewery.comment) {
            userComments.push({user, comment: brewery.comment})
        }
    })

    // PROBLEM: This component isn't updated. Maybe the data structure needs to be changed to make this work!

    if (userComments.length > 0) {
        return <div className="comments">
            {userComments.map((userComment, index) => {
                return <div className="user-comment">
                    <h4>{userComment.user}</h4>
                    <p>{userComment.comment}</p>
                </div>
            })}
        </div>
    } else {
        return null
    }
}

export default Comments