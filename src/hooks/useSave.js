import { useSelector, useDispatch } from "react-redux"

const useSave = () => {
    
    // Save the whole redux state to the server!
    const state = useSelector(state => state)

    const dispatch = useDispatch()

    const url = 'http://127.0.0.1:3010/save'

    // Hooks can't be called in event handlers, so useSave returns a function that should be used instead!
    return () => {

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
    }
}

export default useSave