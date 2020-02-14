import React from 'react'
import './SecondUserTable.css'
import TableRow from './SecondUserTableRow/SecondUserTableRow'
import { connect } from 'react-redux'
import store from '../../../redux/store'

import { getProductsSecond, getTotalPriceSecond } from '../../../redux/actions/productAction'
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
                        'Authorization': `Bearer ${localStorage.getItem('second-jwt')}`
                    }
                })
                .then(res => {
                    store.dispatch(getProductsSecond(res.data));
                    let totalPrice = 0;
                    for (let i = 0; i < res.data.length; i++) {
                        totalPrice += parseInt(res.data[i].price)
                    }
                    store.dispatch(getTotalPriceSecond(totalPrice));
                })
                .catch(err => {
                    console.log(err);
                })
        }
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
                    
                />)
            })
        }

        return (
            <div>
                <main className="second-main-box-table">
                    <table className="second-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Description</th>
                                <th>Purchase Date</th>
                                <th>Product Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="second-emptyTd"></td>
                            </tr>
                            {tableRow}
                        </tbody>
                    </table>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.secondUserProducts,
        expensesClicked: state.expensesClicked,
        tableUpdated: state.tableUpdated
    }
}


export default connect(mapStateToProps)(Table)