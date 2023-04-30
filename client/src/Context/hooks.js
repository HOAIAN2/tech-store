import { useContext } from 'react'
import { UserContext } from './UserContext'
import { PropContext } from './propContext'
import { SortContext } from './sortContext'

function useUserData() {
    return useContext(UserContext)
}
function usePropData() {
    return useContext(PropContext)
}
function useSortData() {
    return useContext(SortContext)
}

export {
    useUserData,
    usePropData,
    useSortData
}