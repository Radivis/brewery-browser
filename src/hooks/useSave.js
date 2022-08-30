/*
This custom hook enables a component to save the store data to the store.json file.

If it is used at the top of the component, the following happens
1. An event handler in the component dispatches an action
2. That action is passed to the reducer
3. The reducer updates the state and sets the store flag "shouldUpdate" to true
4. The component is rerendered
5. This hook notices that "shouldUpdate" is true and hits the save route of the data server
6. The flag "shouldUpdate" is set to false

Note that for this to work, the reducer MUST set "shouldUpdate" to true
when the corresponding action is dispatched!
*/

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useSave = () => {

    // Save the whole redux state to the server!
    const state = useSelector(state => state)
    const shouldSave = useSelector(state => state.shouldSave)

    const dispatch = useDispatch()

    const url = 'http://127.0.0.1:3010/save'

    if (shouldSave) {
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        }).then(res => {
            console.log(res);
        })
            .catch(err => {
                console.error(err)
                dispatch({ type: 'SET_NO_CONNECTION_TO_DATA_SERVER' })
            })

        dispatch({ type: "SET_SHOULD_SAVE_FALSE" })
    }
}

export default useSave