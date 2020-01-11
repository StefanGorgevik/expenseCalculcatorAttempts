import React from 'react'
import './Table.css'
import Alert from '../Alert/Alert'
import TableRow from './TableRow'
import TableTools from './TableTools'
import { connect } from 'react-redux'
import store from '../../redux/store'

import { deleteProduct, getProducts, editProduct, editProductClicked, getTotalPrice, tableUpdated } from '../../redux/actions/productAction'
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
        if(this.props.products) {
            axios.get("http://localhost:8005/app/v1/products/?sort=date:desc",
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
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
    }

    componentDidUpdate() {
        if (this.props.tableUpdated) {
                axios.get("http://localhost:8005/app/v1/products/?sort=date:desc",
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        }
                    }
                )
                    .then(res => {
                        store.dispatch(getProducts(res.data));
                        store.dispatch(tableUpdated(false));
                    })
                    .catch(err => {
                        console.log(err);
                    })
               
        }
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
        this.setState({ alertShow: false })
        axios.delete(`http://localhost:8005/app/v1/products/${productID}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                console.log(res)
                store.dispatch(deleteProduct(product))
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteProductHandler = (product) => {
        this.setState({ product: product })
        this.setState({ alertShow: true })

    }

    render() {
        let tableRow = null;
        if (this.props.products) {
            tableRow = this.props.products.map(product => {
                return (<TableRow key={product.name + Math.random()} name={product.name}
                    deleteProduct={() => this.deleteProductHandler(product)}
                    editProduct={() => this.editProduct(product)}
                    type={product.type}
                    description={product.description}
                    date={product.date}
                    price={product.price}
                    tableTools={TableTools}
                />)
            })
        }

        let alert = null;
        if (this.state.alertShow) {
            alert = <Alert hide={this.hideAlert}
                delete={() => this.deleteProduct(this.state.product, this.state.product._id)}
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
                                {this.props.expensesClicked ? null : <th>Product Options</th>}
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
        products: state.products,
        expensesClicked: state.expensesClicked,
        tableUpdated: state.tableUpdated
    }
}

export default connect(mapStateToProps)(Table)