import { createContext, useReducer } from 'react'

const PROP_ACTION = {
    SETPROPBRAND: 'SETPROP',
    REMOVEPROPBRAND: 'REMOVEPROP',
    SETPROPADDRESS: 'SETPROPADDRESS',
    REMOVEPROPADDRESS: 'REMOVEPROPADDRESS',
    SETPROPSTAR: 'SETPROPSTAR',
    REMOVEPROPSTAR: 'REMOVEPROPSTAR'
}

const PropContext = createContext()



function PropReducer(state, action) {
    switch (action.type) {
        case PROP_ACTION.SETPROPBRAND:
            let a = state ? state.brand ? state.brand.filter(item => item) : [] : []
            return {
                ...state,
                brand: a.includes(action.payload) ? a.filter(item => item != action.payload) : [...a, action.payload]
            };
        case PROP_ACTION.SETPROPADDRESS:
            let c = state ? state.address ? state.address.filter(item => item) : [] : []
            return {
                ...state,
                address: c.includes(action.payload) ? c.filter(item => item != action.payload) : [...c, action.payload]
            };
        case PROP_ACTION.SETPROPSTAR:
            let d = state ? state.star ? state.star.filter(item => item) : [] : []
            return {
                ...state,
                star: d.includes(action.payload) ? d.filter(item => item != action.payload) : [...d, action.payload]
            }
        default:
            return state;
    }
}

function PropProvider({ children }) {
    const [prop, dispatchProp] = useReducer(PropReducer, null)
    return (
        <PropContext.Provider value={[prop, dispatchProp]}>
            {children}
        </PropContext.Provider>
    )
}


export {
    PROP_ACTION,
    PropContext
}

export default PropProvider