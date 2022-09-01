import deepCopy from "../helpers/deepCopy"

// Helper function to store another brewery in a user object
const addBreweryIfNotRegisteredYet = (user, breweryId) => {
    const registeredBreweryIds = user.breweries.map(brewery => brewery.id)
    const brewery = {
        id: breweryId,
        isFavorite: false,
        rating: -1,
        comment: ''
    }
    if (!registeredBreweryIds.includes(breweryId)) {
        user.breweries.push(brewery)

        // Return the new brewery for further manipulation
        return brewery
    } else {
        // Indicate that the brewery was already registered in the user object
        return null
    }
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN': {
            const newState = deepCopy(state)

            let loggedInUser = null

            state.users.forEach(user => {
                if (action.username === user.username && action.password === user.password) {
                    loggedInUser = user
                }
            })

            if (loggedInUser) {
                console.log('Login successful');
                newState.currentUserId = loggedInUser.id
                return newState
            } else {
                // No maching login data found:
                console.log('Login failed');
                return state
            }
        }
            break;

        case 'LOGOUT': {
            const newState = deepCopy(state)

            newState.currentUserId = -1

            // The last API response should be deleted, so that user users don't see it!
            newState.lastApiResponse = null
            return newState
        }

        case 'REGISTER_USER':
            if (action.username !== ''
                && action.password !== ''
                && action.password === action.passwordRepeat) {
                console.log('User registered successfully')

                const newState = deepCopy(state)
                const newUserId = Math.max(...state.users.map(user => user.id)) + 1
                newState.users.push({
                    id: newUserId,
                    username: action.username,
                    password: action.password,
                    breweries: []
                })

                // New users are logged in immediately!
                newState.currentUserId = newUserId

                // The new user data should be saved!
                newState.shouldSave = true

                return newState
            }

            break;
        case 'UPDATE_API_RESULTS': {
            const newState = deepCopy(state)

            newState.lastApiResponse = action.data
            return newState
        }
            break;

        case 'SET_NO_CONNECTION_TO_DATA_SERVER': {
            const newState = deepCopy(state)

            newState.isBackendServerOnline = false
            return newState
        }
            break;

        case 'SET_SHOULD_SAVE_FALSE': {
            const newState = deepCopy(state)

            newState.shouldSave = false
            return newState
        }
            break;

        case 'IMPORT_STATE_FROM_SERVER': {
            const state = action.data
            // If the data could be imported, the server is definitely online
            state.isBackendServerOnline = true

            // Don't start with an already logged in user!
            state.currentUserId = -1

            return state
        }
            break;

        case 'TOGGLE_FAVORITES': {
            const newState = deepCopy(state)

            const currentUserId = newState.currentUserId
            const currentUser = newState.users.find(user => user.id === currentUserId)

            let brewery = addBreweryIfNotRegisteredYet(currentUser, action.id)

            // If the brewery was already registed, get its data from state 
            if (!brewery) brewery = currentUser.breweries.find(brewery => brewery.id === action.id)

            brewery.isFavorite = !brewery.isFavorite

            newState.shouldSave = true

            return newState
        }
            break;

        case 'ADD_COMMENT': {
            const newState = deepCopy(state)

            const currentUserId = newState.currentUserId
            const currentUser = newState.users.find(user => user.id === currentUserId)

            let brewery = addBreweryIfNotRegisteredYet(currentUser, action.id)

            // If the brewery was already registed, get its data from state 
            if (!brewery) brewery = currentUser.breweries.find(brewery => brewery.id === action.id)

            brewery.comment = action.comment

            newState.shouldSave = true

            return newState
        }
            break;

        case 'RATE': {
            const newState = deepCopy(state)

            const currentUserId = newState.currentUserId
            const currentUser = newState.users.find(user => user.id === currentUserId)

            let brewery = addBreweryIfNotRegisteredYet(currentUser, action.id)

            // If the brewery was already registed, get its data from state 
            if (!brewery) brewery = currentUser.breweries.find(brewery => brewery.id === action.id)

            brewery.rating = action.rating

            newState.shouldSave = true

            return newState
        }
            break;


        default: return state
    }
}

export default reducer