import React from 'react'
import './Expenses.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Expenses extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            monthlyDisplay: true,
            yearlyDisplay: false,
            active: false
        }
    }

    yearlySelect = () => {
        //let display = this.state.monthlyDisplay
        this.setState({monthlyDisplay: false, yearlyDisplay: true, active: true})
    }

    monthlySelect = () => {
        //let display = this.state.yearlyDisplay
        this.setState({yearlyDisplay: false, monthlyDisplay: true, active: false})
    }

    render() {
        let yearly = 
        <select name="month-select" id="month-select">
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
        </select>

        return (
            <React.Fragment>
                <this.props.header />
                <h3 id="expenses-h3">Expenses</h3>
                <div className="expenses-div">
                    <Link to="#"><button className={!this.state.active ? 'active-btn select-btn' : 'select-btn'} onClick={this.monthlySelect}>Monthly</button></Link>
                    <Link to="#"><button className={this.state.active ? 'active-btn select-btn' : 'select-btn'} onClick={this.yearlySelect}>Yearly</button></Link>
                    <div className="select-div">
                        <label htmlFor="month-select">Choose month:</label>
                        {this.state.monthlyDisplay ?
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
                            </select> : yearly}
                    </div>
                </div>
                <this.props.table />
                <div className="transparent-div">
                    <p>Total spent: <span>{this.props.totalPrice}</span> den.</p>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps (state)  {
    return {
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Expenses)