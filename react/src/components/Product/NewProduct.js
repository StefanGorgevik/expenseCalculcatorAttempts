import React from 'react'
import './New-product.css'

import {saveProductAction} from '../../redux/actions/productAction'
import store from '../../redux/store'
import {Link} from 'react-router-dom'
import axios from 'axios'
class NewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                name: '',
                type: '',
                description: '',
                date: '',
                price: ''

        }
    }

    saveProduct = (event) => {
        event.preventDefault()
        this.setState({[event.target.id] : event.target.value})
    }

    createProduct = (event) => {
        store.dispatch(saveProductAction(this.state))
        if(this.state.name == '' || this.state.type == '' || 
            this.state.description == '' || this.state.date=='' || this.state.price == '') {
                event.preventDefault();
                alert('Fill out the fields correctly!')
        } else if(this.state.name !== '' || this.state.type !== '' || 
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

    render() {
    return (
        <React.Fragment>
            <h3 id="new-products-h3">Edit Product</h3>
            <main id="main-box">
                <div className="box-container">
                    <div className="form-box">
                        <form>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="name">Product Name</label>
                                <input onChange={this.saveProduct} className="text-field" type="text" name="name" id="name" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="description">Product Description</label>
                                <input onChange={this.saveProduct} className="text-field" type="text" name="description" id="description" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="type">Product Type</label>
                                <input onChange={this.saveProduct} className="text-field" type="text" name="type" id="type" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="date">Product Date</label>
                                <input onChange={this.saveProduct} className="text-field" type="date" name="date" id="date" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="price">Product Price</label>
                                <input onChange={this.saveProduct} className="text-field" type="number" name="price" id="price" />
                            </p>
                            <Link to='/products'>
                            <button onClick={this.createProduct} id="primary-button" className="primary-btn" type="submit">Create product</button>
                            </Link>
                        </form>
                    </div>
                </div>
                <div className="new-product-div">
                    <span><i className="fas fa-plus-circle"></i></span>
                    <h3>You are creating a new product</h3>
                </div>
            </main>
            <script src="https://kit.fontawesome.com/c449c1f62a.js"></script>
        </React.Fragment>
    )
}
}

export default NewProduct