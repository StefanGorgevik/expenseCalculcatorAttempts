import React from 'react'

import { connect } from 'react-redux'

const tableRow = (props) => {
    return (
        <tr id="first-tr" className="body-tr">
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.description}</td>
            <td>{props.date.toString().slice(0, 10)}</td>
            <td>{props.price}</td>
            {!props.expensesClicked ? 
                <props.tableTools editProduct={props.editProduct} deleteProduct={props.deleteProduct}/> : null}
        </tr>
    )
}

function mapStateToProps(state) {
    return ({
        expensesClicked: state.expensesClicked
    }
    )
}


export default connect(mapStateToProps)(tableRow);