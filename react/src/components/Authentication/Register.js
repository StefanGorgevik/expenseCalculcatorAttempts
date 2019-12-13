import React from 'react'
import '../../assets/styles/inputs-shared.css'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <React.Fragment>
     <div className="box" id="register">
                    <form>
                        <p className="input-container">
                                <label className="text-field-input" id="first-name-label" for="first-name">First Name</label>
                                <input className="text-field" type="text" name="first-name" id="first-name"/>
                        </p>
                        <p className="input-container">
                                <label className="text-field-input" for="last-name">Last Name</label>
                                <input className="text-field" type="text" name="last-name" id="last-name"/>
                        </p>
                        <p className="input-container">
                                <label className="text-field-input" for="email">E-mail</label>
                                <input className="text-field" type="email" name="email" id="email"/>
                        </p>
                        <p className="input-container">
                                <label className="text-field-input" for="date-of-birth">Date of Birth</label>
                                <input className="text-field" type="text" name="date-of-birth" id="date-of-birth"/>
                        </p>
                        <p className="input-container">
                                <label className="text-field-input" for="telephone">Telephone</label>
                                <input className="text-field" type="text" name="telephone" id="telephone"/>
                        </p>
                        <p className="input-container">
                                <label className="text-field-input" for="country">Country</label>
                                <input className="text-field" type="text" name="country" id="country"/>
                        </p>
                        <p className="input-container">
                                <label className="text-field-input" for="password">Password</label>
                                <input className="text-field" type="password" name="password" id="password"/>
                        </p>
                        <button className="primary-btn" type="submit">Register</button>
                    </form>
                </div>

    
            <div className="textDiv">
                <p>Or if you already have an account, <Link className="additional-info" to="/">Sign in</Link></p>
            </div>
        </React.Fragment>
    )
}

export default Register