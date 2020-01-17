import React from 'react'
import './Table.css'
import Alert from '../Alert/Alert'
import TableRow from './TableRow'
import TableTools from './TableTools'
import { connect } from 'react-redux'
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
        console.log('comp did mount')
        this.props.getProducts();
    }

    componentDidUpdate() {
        if (this.props.tabUpdated) {
            this.props.getProducts();
            this.props.tableUpdated(false); 
        }
    }

    hideAlert = () => {
        this.setState({ alertShow: false })
    }

    editProduct = (product) => {
        const clicked = !this.state.editProductClicked
        this.props.editProduct(product)
       
        this.props.editProductClicked(clicked)
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
                this.props.deleteProduct(product)
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
        let totalPrice = 0;
        for (let i = 0; i < this.props.products.length; i++) {
            totalPrice += parseInt(this.props.products[i].price)
        }
        this.props.getTotalPrice(totalPrice);

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
                                {!this.props.expensesClicked ? <th>Product Options</th> : null}
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
        tabUpdated: state.tableUpdated
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => {
            dispatch(getProducts())
        },
        deleteProduct: (product) => {
            dispatch(deleteProduct(product))
        },
        getTotalPrice: (totalPrice) => {
            dispatch(getTotalPrice(totalPrice))
        },
        tableUpdated: (tabUpdated) => {
            dispatch(tableUpdated(tabUpdated))
        },
        editProduct: (product) => {
            dispatch(editProduct(product))
        },
        editProductClicked: (editProdClicked) => {
            dispatch(editProductClicked(editProdClicked))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)