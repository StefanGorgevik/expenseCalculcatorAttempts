import React from 'react'
import './Products.css'
import { Link } from 'react-router-dom'

import store from '../../redux/store'
import { getProducts, editProductClicked } from '../../redux/actions/productAction'
import axios from 'axios'
class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: true
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8005/app/v1/products")
            .then(res => {
                store.dispatch(getProducts(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        axios.get("http://localhost:8005/app/v1/products")
            .then(res => {
                store.dispatch(getProducts(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }

    newProductHandler = () => {
        const clicked = !this.state.clicked
        store.dispatch(editProductClicked(clicked))
    }

    render() {
        return (
            <React.Fragment>
                <this.props.header />
                <div className="main-div">
                    <h3>Products</h3>
                    <label htmlFor="sort">Filter by:
                <select name="sort" id="sort">
                            <option>Year</option>
                            <option>Highest Price</option>
                            <option>Lowest Price</option>
                            <option>Latest Purchases</option>
                        </select>
                    </label>
                </div>
                <this.props.table />
                <Link to="/new-product"><button className="new-btn" onClick={this.newProductHandler}>New Product</button></Link>
            </React.Fragment>
        )
    }
}

export default Products