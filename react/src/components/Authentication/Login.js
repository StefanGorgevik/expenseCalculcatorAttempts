import React from 'react'
import '../../assets/styles/inputs-shared.css'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <React.Fragment>
            <main>
                <div className="box" id="login">
                    <form>
                    <p class="input-container">
                            <label class="text-field-input" for="email">E-mail</label>
                            <input class="text-field" type="email" name="email" id="email"/>
                    </p>
                    <p class="input-container">
                            <label class="text-field-input" for="password">Password</label>
                            <input class="text-field" type="password" name="password" id="password"/>
                    </p>
                    <button className="primary-btn" type="submit">Sign in</button>
                </form>
            </div>
        
        <div className="textDiv">
            <p>Or if you don't have an account, <Link to="/register" className="additional-info">Register</Link></p>
        </div>
    </main>
        </React.Fragment>
    )
}

export default Login