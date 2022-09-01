/*
Returns the favorite status of a card when a user is logged in

1: Card is a favorite of the user
0: User is not logged in, or user never interacted with the brewery
-1: User interacted with the brewery, but brewery is no favorite
*/

import { useSelector } from "react-redux"

import useUser from "./useUser"

const useFavoriteStatus = (id) => {
    const user = useUser()

    return useSelector(state => {
        if (!user) return 0
        
        const currentUser = state.users.find(_user => _user.id === user.id)
        const currentBrewery = currentUser.breweries.find(brewery => brewery.id === id)
    
        if (currentBrewery) {
             if (currentBrewery.isFavorite) return 1 // favorited
             else return -1 // interacted, but not favorited
        } else {
            // untouched
            return 0
        }
    })
}

export default useFavoriteStatus