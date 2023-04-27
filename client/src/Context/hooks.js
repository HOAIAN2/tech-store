import { useContext } from 'react'
import { UserContext } from './UserContext'
import { PropContext } from './propContext'

function useUserData() {
    return useContext(UserContext)
}
function usePropData() {
    return useContext(PropContext)
}

export {
    useUserData,
    usePropData,
}