import { createContext, useReducer } from 'react'

const SortContext = createContext()
const SORT_ACTION = {
    SETSORT: 'SETSORT',
    REMOVESORT: 'REMOVESORT'
}

function sortReducer(state, action) {
    switch (action.type) {
        case SORT_ACTION.SETSORT:
            return {
                products: [...action.products]
            }
        default:
            return state;
    }
}


function SortProvider({ children }) {
    const [sort, dispatchSort] = useReducer(sortReducer, null)
    return (
        <SortContext.Provider value={[sort, dispatchSort]}>
            {children}
        </SortContext.Provider>
    )
}

export {
    SortContext,
    SORT_ACTION,
}
export default SortProvider