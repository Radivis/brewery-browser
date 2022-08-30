/*
This custom hook returns the user object,
if a user is logged in, and null otherwise
*/
import { useSelector } from "react-redux"

const useUser = () => {
    const currentUserId = useSelector(state => state.currentUserId)
    const users = useSelector(state => state.users)

    if(currentUserId > 0) {
        return users.find(user => user.id === currentUserId)
    } else {
        return null
    }
}

export default useUser