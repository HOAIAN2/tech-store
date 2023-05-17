import { createContext, useReducer } from 'react'

const OrderContext = createContext()
const ORDER_ACTION = {
    SET: 'SET',
    REMOVE: 'REMOVE',
    EDIT: 'EDIT'
}

function orderReducer(state, action) {
    switch (action.type) {
        case ORDER_ACTION.SET:
            return [...action.payload].map(order => {
                return { ...order, orderDate: order.orderDate !== null ? new Date(order.orderDate) : null }
            })
        case ORDER_ACTION.EDIT:
            const temp = [...state]
            temp.pop()
            temp.push(action.payload)
            return [...temp]
        case ORDER_ACTION.REMOVE:
            return []
        default:
            return state;
    }
}


function OrderProvider({ children }) {
    const [orders, dispatchOrders] = useReducer(orderReducer, [])
    return (
        <OrderContext.Provider value={[orders, dispatchOrders]}>
            {children}
        </OrderContext.Provider>
    )
}

export {
    OrderContext,
    ORDER_ACTION,
}
export default OrderProvider