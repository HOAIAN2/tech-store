import { createContext, useReducer } from 'react'
const UserContext = createContext()
const USER_ACTION = {
    SET: 'SET',
    REMOVE: 'REMOVE'
}

function userReducer(state, action) {
    switch (action.type) {
        case USER_ACTION.SET:
            const birthDate = new Date(action.payload.birthDate)
            return { ...action.payload, birthDate: birthDate }
        case USER_ACTION.REMOVE:
            return null
        default:
            break;
    }
}

function UserProvider({ children }) {
    const [user, dispatchUser] = useReducer(userReducer, null)
    return (
        <UserContext.Provider value={[user, dispatchUser]}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    USER_ACTION
}
export default UserProvider