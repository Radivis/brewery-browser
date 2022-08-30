import React from 'react';
import { useSelector } from 'react-redux';

import useUser from '../../hooks/useUser';
import BreweryCard from '../BreweryCard/BreweryCard';

const Favorites = () => {
    const user = useUser()
    
    const favorites = useSelector(state => {
        if (user) {
            const currentUser = state.users.find(_user => _user.id === user.id)
            return currentUser.breweries.filter(brewery => brewery.isFavorite)
        } else {
            return []
        }
    })

    // First render the cards, let them load the data on their own!

    return <div className="cards">
        {favorites.map(favorite => <BreweryCard
            data={{id: favorite.id}}
            key={favorite.id} />
            )}
    </div>
}

export default Favorites