import React from 'react'

import { Link } from 'react-router-dom'

const tableTools = (props) => {
    return (
        <tr id="first-tr" className="body-tr">
            <td>{props.name}</td>
            <td>{props.type}</td>
            <td>{props.description}</td>
            <td>{props.date}</td>
            <td>{props.price}</td>
            <td>
                <Link to="/edit-product">
                    <button id="edit-button" ><i className="far fa-edit"></i></button>
                </Link>
                <button onClick={props.deleteProduct} id="delete-button"><i className="far fa-trash-alt"></i></button>
            </td>
        </tr>
    )
}

export default tableTools;