import React from 'react'

import MergedTableRow from '../MergedTableRow/MergedTableRow'

import { connect } from 'react-redux'

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        console.log(this.props.mergedProducts);
        var mergedTableRow = null;
        if (this.props.mergedProducts) {
            mergedTableRow = this.props.mergedProducts.map(product => {
                return (<MergedTableRow key={product.name + Math.random()} 
                    name={product.name}
                    type={product.type}
                    description={product.description}
                    date={product.date}
                    price={product.price}
                    userName={product.userName}
                />)
            })
        }

        return (
            <React.Fragment>
                <main className="main-box-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Description</th>
                                <th>Purchase Date</th>
                                <th>Product Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="emptyTd"></td>
                            </tr>
                            {mergedTableRow}
                        </tbody>
                    </table>
                </main>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        mergedProducts: state.mergedProducts
    }
}


export default connect(mapStateToProps)(Table)