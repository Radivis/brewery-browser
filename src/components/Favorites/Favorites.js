import React from 'react';
import { useSelector } from 'react-redux';

import useUser from '../../hooks/useUser';
import BreweryCard from '../BreweryCard/BreweryCard';
import PageHeader from '../PageHeader/PageHeader';

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

    const nonFavorites = useSelector(state => {
        if (user) {
            const currentUser = state.users.find(_user => _user.id === user.id)
            return currentUser.breweries.filter(brewery => !brewery.isFavorite)
        } else {
            return []
        }
    })

    // First render the cards, let them load the data on their own!

    return <>
        <PageHeader title="Favorites" />
        <div className="cards">
            {favorites.map(favorite => <BreweryCard
                data={{ id: favorite.id }}
                key={favorite.id} />
            )}

        </div>
        {nonFavorites.length > 0 && (
            <>
                <h3>Interacted, but not favorized</h3>
                <div className="cards">
                    {nonFavorites.map(nonFavorite => <BreweryCard
                        data={{ id: nonFavorite.id }}
                        key={nonFavorite.id} />
                    )}
                </div>
            </>
        )}
    </>
}

export default Favorites

// Interacted, but not favorited