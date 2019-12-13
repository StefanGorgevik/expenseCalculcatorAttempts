import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <React.Fragment>
            <header>
                <nav className="nav">
                    <div className="buttons">        
                                <Link to='/products'><button className="main-buttons" id="products-btn">Products</button></Link>
                                <Link to="/expenses"><button className="main-buttons" id="expenses-btn">Expenses</button></Link>                     
                    </div>
                    <div className="right-side">
                        <img id="profile-image" src="../../assets/images/small_profile.png" alt="profile-image" /><p>Gal Gadot</p>
                    </div>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default Header