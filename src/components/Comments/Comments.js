import React from 'react';
import { useSelector } from 'react-redux';

const Comments = ({ id }) => {
    const userComments = useSelector(state => {
        // First get all users to iterate over them
        const users = state.users
        
        // Add any comment any user has made on this brewery
        const userComments = []

        users.forEach(user => {
            const brewery = user.breweries.find(brewery => brewery.id === id)

            if (brewery && brewery.comment) {
                userComments.push({ user: user.username, comment: brewery.comment })
            }
        })

        return userComments
    })

    if (userComments.length > 0) {
        return <div className="comments">
            {userComments.map((userComment, index) => {
                return <div className="user-comment" key={index}>
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