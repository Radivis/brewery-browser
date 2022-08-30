import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducer';

const preloadedState = {
    isBackendServerOnline: true,
    shouldSave: false, // flag to indicate whether state should be saved
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