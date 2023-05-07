import { createContext, useReducer } from 'react'

const ProductContext = createContext()
const PRODUCT_ACTION = {
    SETPRODUCT: 'SETPRODUCT',
    REMOVEProduct: 'REMOVEProduct'
}

function productReducer(state, action) {
    console.log(action)
    switch (action.type) {
        case PRODUCT_ACTION.SETPRODUCT:
            let a = state ? state.products ? state.products.filter(item => item) : [] : []
            return {
                products: action.typeproduce === 'new' ? [...action.payload] : [...a, ...action.payload],
                index: action.index
            }
        default:
            return state
    }
}


function ProductProvider({ children }) {
    const [product, dispatchProduct] = useReducer(productReducer, null)
    return (
        <ProductContext.Provider value={[product, dispatchProduct]}>
            {children}
        </ProductContext.Provider>
    )
}

export {
    ProductContext,
    PRODUCT_ACTION,
}
export default ProductProvider