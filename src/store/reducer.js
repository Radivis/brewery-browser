import deepCopy from "../helpers/deepCopy"

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
            return action.data
        }
            break;


        default: return state
    }
}

export default reducer