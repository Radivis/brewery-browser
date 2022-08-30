import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLoad = () => {
    const dispatch = useDispatch()
    const url = 'http://127.0.0.1:3010/load'

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            dispatch({
                type: 'IMPORT_STATE_FROM_SERVER',
                data
            })
        })
            .catch(err => {
                console.error(err)
                dispatch({ type: 'SET_NO_CONNECTION_TO_DATA_SERVER' })
            })
    }, [])
}

export default useLoad