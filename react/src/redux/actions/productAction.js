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

