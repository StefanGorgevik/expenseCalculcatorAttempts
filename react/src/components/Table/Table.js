import React from 'react'
import './Table.css'
import Alert from '../Alert/Alert'
import TableRow from './TableRow'
import { connect } from 'react-redux'
import store from '../../redux/store'

import { deleteProduct, getProducts, getTotalPrice, editProduct, editProductClicked } from '../../redux/actions/productAction'
import axios from 'axios'


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: false,
            product: null,
            editProductClicked: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8005/app/v1/products")
            .then(res => {
                store.dispatch(getProducts(res.data));
                let totalPrice = 0;
                for (let i = 0; i < res.data.length; i++) {
                    totalPrice += parseInt(res.data[i].price)
                }
                store.dispatch(getTotalPrice(totalPrice));
                
            })
            .catch(err => {
                console.log(err);
            })
    }


    hideAlert = () => {
        this.setState({ alertShow: false })
    }

    editProduct = (product) => {
        const clicked = !this.state.editProductClicked
        store.dispatch(editProduct(product));
        store.dispatch(editProductClicked(clicked));

    }

    deleteProduct = (product, productID) => {
        this.setState({ alertShow: true })
        this.setState({ product: product })
        axios.delete(`http://localhost:8005/app/v1/products/${productID}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteProductHandler = () => {
        this.setState({ alertShow: false })
        store.dispatch(deleteProduct(this.state.product))
    }

    render() {
        let tableRow = null;
        if (this.props.products) {
            tableRow = this.props.products.map(product => {
                return (<TableRow key={product._id} name={product.name}
                    deleteProduct={() => this.deleteProduct(product, product._id)}
                    editProduct={() => this.editProduct(product)}
                    type={product.type}
                    description={product.description}
                    date={product.date}
                    price={product.price}
                />)
            })
        }

        let alert = null;
        if (this.state.alertShow) {
            alert = <Alert hide={this.hideAlert}
                delete={this.deleteProductHandler}
            />
        }

        return (

            <React.Fragment>
                <main className="main-box">
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Description</th>
                                <th>Purchase Date</th>
                                <th>Product Price</th>
                                <th>Product Options</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td id="emptyTd"></td>
                            </tr>
                            {tableRow}
                        </tbody>
                    </table>
                </main>
                {alert}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Table)