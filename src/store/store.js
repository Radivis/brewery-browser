import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducer';

const preloadedState = {
    lastApiResponse: null,
    currentUserId: -1,
    users: [{
        id: 1,
        username: 'Paul',
        password: 'faul',
        breweries: [
            {
                id: 'string',
                isFavorite: false,
                rating: -1,
            }
        ]
    }]
}

const store = configureStore({ reducer, preloadedState })

export default store