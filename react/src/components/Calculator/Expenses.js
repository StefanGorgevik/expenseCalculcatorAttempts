import React from 'react'
import './Expenses.css'
import {Link} from 'react-router-dom'

const Expenses = (props) => {
    return (
        <React.Fragment>
            <props.header/>
            <h3 id="expenses-h3">Expenses</h3>
            <div className="expenses-div">
                <Link to="#"><button id="monthly-btn">Monthly</button></Link>
                <Link to="#"><button id="yearly-btn">Yearly</button></Link>
                <div className="select-div">
                    <label htmlFor="month-select">Choose month:</label>
                    <select name="month-select" id="month-select">
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>

                </div>

            </div>
            <props.table/>
        </React.Fragment>
    )
}

export default Expenses