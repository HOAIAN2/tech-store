import { useContext } from 'react'
import { UserContext } from './UserContext'
import { PropContext } from './propContext'
import { ProductContext } from './productContext'

function useUserData() {
    return useContext(UserContext)
}
function usePropData() {
    return useContext(PropContext)
}
function useProductData() {
    return useContext(ProductContext)
}

export {
    useUserData,
    usePropData,
    useProductData
}