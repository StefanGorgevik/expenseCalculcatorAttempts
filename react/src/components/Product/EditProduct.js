import React from 'react'
import './New-product.css'

const EditProduct = () => {
    return (
        <React.Fragment>
            <h3 id="new-products-h3">Edit Product</h3>
            <main id="main-box">
                <div className="box-container">
                    <div className="form-box">
                        <form>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="product-name">Product Name</label>
                                <input className="text-field" type="text" name="product-name" id="product-name" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="product-description">Product Description</label>
                                <input className="text-field" type="text" name="product-description" id="product-description" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="product-type">Product Type</label>
                                <input className="text-field" type="text" name="product-type" id="product-type" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="product-date">Product Date</label>
                                <input className="text-field" type="text" name="product-date" id="product-date" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="product-price">Product Price</label>
                                <input className="text-field" type="number" name="product-price" id="product-price" />
                            </p>
                            <button id="primary-button" className="primary-btn" type="submit">Edit product</button>
                        </form>
                    </div>
                </div>
                <div className="new-product-div">
                    <span><i className="fas fa-plus-circle"></i></span>
                    <h3>You are editing a product</h3>
                </div>
            </main>
            <script src="https://kit.fontawesome.com/c449c1f62a.js"></script>
        </React.Fragment>
    )
}

export default EditProduct