/*
Displays a collection of BreweryCards of breweries
that a logged in user has favorited.

Also displays BreweryCards of breweries
that a user has interacted with, but currently
not favorited.
*/

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
    if (user) {
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
                <h3>You interacted with these, but they are not favorized...</h3>
                <div className="cards">
                    {nonFavorites.map(nonFavorite => <BreweryCard
                        data={{ id: nonFavorite.id }}
                        key={nonFavorite.id} />
                    )}
                </div>
            </>
        )}
    </>
    } else {
        return <>
        <PageHeader title="Favorites" />
        <p>This page only shows your favorite breweries, if you are logged in.</p>
        </>
    }

}

export default Favorites