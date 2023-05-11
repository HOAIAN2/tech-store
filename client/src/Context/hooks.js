import { useContext } from 'react'
import { UserContext } from './UserContext'
import { PropContext } from './propContext'
import { ProductContext } from './productContext'
import { OrderContext } from './OrderContext'

function useUserData() {
    return useContext(UserContext)
}
function usePropData() {
    return useContext(PropContext)
}
function useProductData() {
    return useContext(ProductContext)
}
function useOrderData() {
    return useContext(OrderContext)
}
export {
    useUserData,
    usePropData,
    useProductData,
    useOrderData
}