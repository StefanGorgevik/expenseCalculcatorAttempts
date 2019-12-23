import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: true
        }
    }

    expensesClicked = () => {
        this.setState({active: false})
    }

    productsClicked = () => {
        this.setState({active: true})
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <nav className="nav">
                        <div className="buttons">
                            <Link to='/products'><button className={this.state.active ? 'main-buttons active-btn' : 'main-buttons'} onClick={this.productsClicked}>Products</button></Link>
                            <Link to="/expenses"><button className={!this.state.active ? 'main-buttons active-btn' : 'main-buttons'} onClick={this.expensesClicked}>Expenses</button></Link>
                        </div>
                        <div className="right-side">
                            <img id="profile-image" src="../../assets/images/small_profile.png" alt="profile-image" />
                            <p>Gal Gadot</p>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        )
    }
}

export default Header