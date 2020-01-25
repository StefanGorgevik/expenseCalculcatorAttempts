import React from 'react'
import '../../assets/styles/Authentication.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { saveUserName } from '../../redux/actions/userAction'
import store from '../../redux/store'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            signed: false,
            error: null
        }
    }   
    
    componentDidMount() {
        localStorage.clear()
    }

    saveLoginData = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    redirectToMain = () => {
        if (this.state.signed) {
            return <Redirect to='/products' />
        }
    }

    signIn = (event) => {
        localStorage.clear()
        event.preventDefault();
        axios.post('http://127.0.0.1:8006/app/v1/auth/login',
            {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                localStorage.setItem('jwt', res.data.jwt);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('first_name', res.data.first_name);
                localStorage.setItem('last_name', res.data.last_name);
                const name = res.data.first_name + ' ' + res.data.last_name
                store.dispatch(saveUserName(name))
                this.setState({ signed: true, error: false })
            })
            .catch(err => {
                this.setState({ error: true})
                console.log(err)
            });
    }

    render() {
        return (
            <React.Fragment>
                {this.redirectToMain()}
                <main>
                    <div className="box" id="login">
                        <form>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="email">E-mail</label>
                                <input onChange={this.saveLoginData} className="text-field" type="email" name="email" id="email" />
                            </p>
                            <p className="input-container">
                                <label className="text-field-input" htmlFor="password">Password</label>
                                <input onChange={this.saveLoginData} className="text-field" type="password" name="password" id="password" />
                            </p>
                            {this.state.error ? <p className="error-p">Wrong email or password!</p> : null}
                            <button className="primary-btn" type="submit" onClick={this.signIn}>Sign in</button>
                        </form>
                    </div>

                    <div className="textDiv">
                        <p>Or if you don't have an account, <Link to="/register" className="additional-info">Register</Link></p>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Login