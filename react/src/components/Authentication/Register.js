import React from 'react'
import '../../assets/styles/inputs-shared.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Redirect } from 'react-router-dom'

class Register extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        first_name: null,
                        last_name: null,
                        email: null,
                        date_of_birth: null,
                        telephone: null,
                        country: null,
                        password: null,
                        signed: false
                }
        }
        saveUserToState = (event) => {
                this.setState({ [event.target.name]: event.target.value });
        }

        redirectToMain = () => {
                if(this.state.signed) {
                        return <Redirect to='/products' />
                }
        }

        saveUser = (event) => {
                if (this.state.first_name == null || this.state.last_name == null ||
                        this.state.email == null || this.state.date_of_birth == null ||
                        this.state.telephone == null || this.state.country == null || this.state.password == null) {
                        event.preventDefault()
                        alert('Please input correct data!')
                } else if(this.state.first_name !== null && this.state.last_name !== null &&
                        this.state.email !== null && this.state.date_of_birth !== null &&
                        this.state.telephone !== null && this.state.country !== null && this.state.password !== null) {
                        console.log("Entered else")
                        event.preventDefault()
                        axios.post('http://127.0.0.1:8006/app/v1/auth/register', {
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                email: this.state.email,
                                password: this.state.password,
                                date_of_birth: this.state.date_of_birth,
                                telephone: this.state.telephone,
                                country: this.state.country,
                                _created: new Date(),
                        })
                                .then(res => {
                                        console.log(res)
                                       
                                        console.log("ENTERED 1st RESPONSE")
                                        axios.post('http://127.0.0.1:8006/app/v1/auth/login',
                                                {
                                                        email: this.state.email,
                                                        password: this.state.password
                                                })
                                                .then(res => {
                                                        console.log("RESPONSE STARTED")
                                                        this.setState({ signed: true })
                                                        localStorage.setItem('jwt', res.data.jwt);
                                                        localStorage.setItem('first_name', this.state.first_name);
                                                        localStorage.setItem('last_name', this.state.last_name);  
                                                })
                                                .catch(err => {
                                                        console.log(err)
                                                });
                                })
                                .catch(err => {
                                        console.log(err)
                                })
                }
        }


        render() {
                return (
                        <React.Fragment>
                                {this.redirectToMain()}
                                <div className="box" id="register">
                                        <form>
                                                <p className="input-container">
                                                        <label className="text-field-input" id="first-name-label" htmlFor="first_name">First Name</label>
                                                        <input onChange={this.saveUserToState} className="text-field" type="text" name="first_name" id="first_name" />
                                                </p>
                                                <p className="input-container">
                                                        <label className="text-field-input" htmlFor="last_name">Last Name</label>
                                                        <input onChange={this.saveUserToState} className="text-field" type="text" name="last_name" id="last_name" />
                                                </p>
                                                <p className="input-container">
                                                        <label className="text-field-input" htmlFor="email">E-mail</label>
                                                        <input onChange={this.saveUserToState} className="text-field" type="email" name="email" id="email" />
                                                </p>
                                                <p className="input-container">
                                                        <label className="text-field-input" htmlFor="date_of_birth">Date of Birth</label>
                                                        <input onChange={this.saveUserToState} className="text-field" type="date" name="date_of_birth" id="date_of_birth" />
                                                </p>
                                                <p className="input-container">
                                                        <label className="text-field-input" htmlFor="telephone">Telephone</label>
                                                        <input onChange={this.saveUserToState} className="text-field" type="text" name="telephone" id="telephone" />
                                                </p>
                                                <p className="input-container">
                                                        <label className="text-field-input" htmlFor="country">Country</label>
                                                        <input onChange={this.saveUserToState} className="text-field" type="text" name="country" id="country" />
                                                </p>
                                                <p className="input-container">
                                                        <label className="text-field-input" htmlFor="password">Password</label>
                                                        <input onChange={this.saveUserToState} className="text-field" type="password" name="password" id="password" />
                                                </p>
                                                <button className="primary-btn" type="submit" onClick={this.saveUser}>Register</button>
                                        </form>
                                </div>

                                <div className="textDiv">
                                        <p>Or if you already have an account, <Link className="additional-info" to="/">Sign in</Link></p>
                                </div>
                        </React.Fragment>
                )
        }
}

export default Register