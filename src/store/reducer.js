import deepCopy from "../helpers/deepCopy"

const reducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return state
        case 'UPDATE_API_RESULTS':
            const newState = deepCopy(state)

            newState.lastApiResponse = action.data
            return newState

        default: return state
    }
}

export default reducer