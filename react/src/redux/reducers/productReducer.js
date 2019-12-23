const initState = {
    products: [],
    totalPrice: '',
    productToEdit: '',
    editProductClicked: ''
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
        case "GET_TOTAL_PRICE": {
            return {...state, totalPrice: action.payload}
        }

        case "EDIT_PRODUCT": {
            return {...state, productToEdit: action.product}
        }

        case "EDIT_PRODUCT_CLICKED": {
            return {...state, editProductClicked: action.editProductClicked}
        }
        default:
            return state
    }
}