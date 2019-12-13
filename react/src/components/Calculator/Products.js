import React from 'react'
import './Products.css'
import {Link} from 'react-router-dom'

class Products extends React.Component {
    render() {
        return (
            <React.Fragment>
                <this.props.header/>
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
                <this.props.table/>
                <Link to="/new-product"><button className="new-btn">New Product</button></Link>
            </React.Fragment>
        )
    }  
}

export default Products