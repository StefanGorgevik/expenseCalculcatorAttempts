import React from 'react'
import './New-product.css'

import { saveProductAction } from '../../redux/actions/productAction'
import store from '../../redux/store'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
class NewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.editProductClicked ? this.props.productToEdit.name : '',
            type: this.props.editProductClicked ? this.props.productToEdit.type : '',
            description: this.props.editProductClicked ? this.props.productToEdit.description : '',
            date: this.props.editProductClicked ? this.props.productToEdit.date : '',
            price: this.props.editProductClicked ? this.props.productToEdit.price : ''
        }
    }

    saveProduct = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    createProduct = (event) => {
        store.dispatch(saveProductAction(this.state))
        if (this.state.name == '' || this.state.type == '' ||
            this.state.description == '' || this.state.date == '' || this.state.price == '') {
            event.preventDefault();
            alert('Fill out the fields correctly!')
        } else if (this.state.name !== '' || this.state.type !== '' ||
            this.state.description !== '' || this.state.date !== '' || this.state.price !== '') {
            axios.post('http://localhost:8005/app/v1/products', {
                name: this.state.name,
                type: this.state.type,
                description: this.state.description,
                date: this.state.date,
                price: this.state.price,
                _created: new Date()
            }
            )
                .then(res => console.log(res))
                .catch(err => console.log(err.response))
        }
    }

    editProduct = (event) => {
        if (this.state.name === '' || this.state.type === '' ||
            this.state.description === '' || this.state.date === '' || this.state.price === '') {
                alert('Please fill the fields!')
                event.preventDefault()
        } else {
            axios.put(`http://localhost:8005/app/v1/products/${this.props.productToEdit._id}`, {
                name: this.state.name,
                type: this.state.type,
                description: this.state.description,
                date: this.state.date,
                price: this.state.price,
                _modified: new Date()
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.editProductClicked ? <h3 id="new-products-h3">Edit Product</h3> : <h3 id="new-products-h3">New Product</h3>}
                <main id="main-box">
                    <div className="box-container">
                        <div className="form-box">
                            <form>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="name">Product Name</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.name : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="text" name="name" id="name" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="description">Product Description</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.description : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="text" name="description" id="description" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="type">Product Type</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.type : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="text" name="type" id="type" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="date">Product Date</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.date : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="date" name="date" id="date" />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-input" htmlFor="price">Product Price</label>
                                    <input defaultValue={this.props.editProductClicked ? this.props.productToEdit.price : ''}
                                        onChange={this.saveProduct}
                                        className="text-field" type="number" name="price" id="price" />
                                </p>
                                <Link to='/products'>
                                    {this.props.editProductClicked ?
                                        <button onClick={this.editProduct} id="primary-button" className="primary-btn" type="submit"> Edit Product</button> :
                                        <button onClick={this.createProduct} id="primary-button" className="primary-btn" type="submit"> Create Product</button>}
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className="new-product-div">
                        <span><i className="fas fa-plus-circle"></i></span>
                        {this.props.editProductClicked ? <h3>You are editing a product</h3> : <h3>You are creating a new product</h3>}

                    </div>
                </main>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        productToEdit: state.productToEdit,
        editProductClicked: state.editProductClicked
    }
}

export default connect(mapStateToProps)(NewProduct)