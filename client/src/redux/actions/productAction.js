import axios from 'axios'
const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
    return async (dispatch) => {
        axios.get('http://localhost:8005/app/v1/products/?sort=date:desc',
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: GET_PRODUCTS,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err)
            });
    }
}
// export const getProducts = (data) => {
//     return {
//         type: 'GET_PRODUCTS',
//         payload: data
//     }
// }

export const deleteProduct = (product) => {
    return {
        type: "DELETE_PRODUCT",
        payload: product
    }
}

export const getTotalPrice = (price) => {
    return {
        type: "GET_TOTAL_PRICE",
        payload: price
    }
}

export const editProduct = (product) => {
    return {
        type: "EDIT_PRODUCT",
        product
    }
}

export const editProductClicked = (editProductClicked) => {
    return {
        type: "EDIT_PRODUCT_CLICKED",
        editProductClicked
    }
}

export const expensesClicked = (expensesClicked) => {
    return {
        type: "EXPENSES_CLICKED",
        expensesClicked
    }
}

export const tableUpdated = (tableUpdated) => {
    return {
        type: "TABLE_UPDATED",
        tableUpdated
    }
}