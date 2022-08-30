/*
This preloadedState is used to initialize the Redux store
If the data server is used, it will be overwritten
by the state from state.json!
*/

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
                comment: ''
            }
        ]
    }]
}

const store = configureStore({ reducer, preloadedState })

export default store