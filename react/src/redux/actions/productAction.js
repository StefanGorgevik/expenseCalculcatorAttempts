export const getProducts = (data) => {
    return {
        type: 'GET_PRODUCTS',
        payload: data
    }
}
export const saveProductAction = (data) => {
    return {
        type: 'SAVE_PRODUCT',
        payload: data
    }
}

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

export const editProduct = (product, editProductClicked) => {
    return {
        type: "EDIT_PRODUCT",
        product,
        editProductClicked
    }
}

export const editProductClicked = (editProductClicked) => {
    return {
        type: "EDIT_PRODUCT_CLICKED",
        editProductClicked
    }
}

