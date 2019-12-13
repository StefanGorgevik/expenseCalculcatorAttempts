// const initState = {
//     id: null,
//     name: null,
//     description: null,
//     date: null,
//     price: null
// }

const initState = {
    products: [{
                id: Math.random(),
                name: 'Coca-Cola',
                type: 'Drink',
                description: 'Gaziran',
                date: '22.12.2019',
                price: '75'
    }]
}

export function productReducer(state = initState, action) {
    switch (action.type) {
        case "SAVE_PRODUCT": {
            return {
                ...state, products: [...state.products, action.payload]
            }
        }
        case "DELETE_PRODUCT": {
            let newProducts = state.products.filter(product => {
                return (action.payload.id !== product.id)
            })
            console.log(newProducts);
            return {...state, products: newProducts}
        }
        

        default:
            return state
    }
}


// case "DELETE_PRODUCT": {
//     const product = action.payload
//     let newArray = []
//     try {
//         newArray = state.products.slice()
//         for (let i = 0; i < newArray.length; i++) {
//             if (newArray[i].id === product.id) {
//                 newArray.splice(i, 1)
//                 break;
//             }
//         }
//         alert('Product successfully deleted')
//         return {
//             ...state, products: newArray
//         }
//     }
//     catch (error) {
//         console.warn(error)
//         alert('Something went wrong!')
//         return {
//             ...state
//         }
//     }
// }