const initState = {
    products: []
}

export function productReducer(state = initState, action) {
    switch (action.type) {
        case "GET_PRODUCTS": {
            return {
                ...state, products: action.payload
            }
        }
        case "SAVE_PRODUCT": {
            return {
                ...state, products: [...state.products, action.payload]
            }
        }
        case "DELETE_PRODUCT": {
            let newProducts = state.products.filter(product => {
                return action.payload._id !== product._id
            })
            return {...state, products: newProducts}
        }
        default:
            return state
    }
}