/* import React from 'react'
import './UserInfo.css'
import axios from 'axios';

import Infos from './Infos'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            values: [],
            keys: [],
            name: '',
            email: '',
            birthday: '',
            country: '',
            telephone: ''
        }
    }

    saveUserInfo = (event) => {
        this.setState({ [event.target.id]: event.target.value })
        console.log(this.state.name, this.state.email, this.state.telephone)
    }

    componentDidMount() {
        axios.post('http://127.0.0.1:8006/app/v1/auth/user-info',
            {
                email: localStorage.getItem('email')
            })
            .then(res => {
                console.log(res.data[0]._id)
                const user = {
                    name: res.data[0].first_name + ' ' + res.data[0].last_name,
                    email: res.data[0].email,
                    birthday: res.data[0].date_of_birth.toString().slice(0, 10),
                    country: res.data[0].country,
                    telephone: res.data[0].telephone
                }
                const keys = Object.keys(user)
                const values = Object.values(user)
                this.setState({ values: values, keys: keys })
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateUserInfo = () => {

    }


    render() {
        var { values, keys } = this.state
        keys = keys.map((k) => { return k.charAt(0).toUpperCase() + k.slice(1) })
        const infos = keys.map((info, index) => {
            return (<Infos key={index} info={info} name={info} val={values[index]} 
                save={this.saveUserInfo}
            />)
        })

        return (
            <div>
                <this.props.header />
                <h3 className="general-h3">General Account Settings</h3>
                <main className="user-info-main">
                    <div className="user-info-div">
                        <div className="user-form-box">
                            <form>
                                {infos}
                                <button className="save-btn">Save Settings</button>
                            </form>
                        </div>
                    </div>
                    <div className="new-product-div">
                        <span><i className="fas fa-plus-circle"></i></span>
                        <h3>You are changing your user account settings</h3>
                    </div>
                </main>
            </div>
        )
    }
}

export default UserInfo

 */


import React from 'react'
import './UserInfo.css'
import axios from 'axios';
import { Link } from 'react-router-dom'

import store from '../../redux/store'
import { saveUserName } from '../../redux/actions/userAction'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last: '',
            email: '',
            birthday: '',
            country: '',
            telephone: '',
            id: ''
        }
    }

    saveUserInfo = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    componentDidMount() {
        axios.post('http://127.0.0.1:8006/app/v1/auth/user-info',
            {
                email: localStorage.getItem('email')
            })
            .then(res => {
                this.setState({
                    first_name: res.data[0].first_name,
                    last_name: res.data[0].last_name,
                    email: res.data[0].email,
                    birthday: res.data[0].date_of_birth.toString().slice(0, 10),
                    country: res.data[0].country,
                    telephone: res.data[0].telephone,
                    id: res.data[0]._id
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateUserInfo = (event) => {
        if (this.state.name === '' || this.state.email === '' ||
            this.state.birthday === '' || this.state.country === '' || this.state.telephone === '') {
            alert('Please fill the fields!')
            event.preventDefault()
        } else {
            axios.put(`http://127.0.0.1:8006/app/v1/auth/user-info/${this.state.id}`, {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                date_of_birth: this.state.date_of_birth,
                country: this.state.country,
                telephone: this.state.telephone,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
                .then(res => {
                    store.dispatch(saveUserName(this.state.first_name, this.state.last_name))
                    localStorage.removeItem('email')
                    localStorage.setItem('email', this.state.email)
                    console.log(res)
                })
                .catch(err =>
                    console.log(err)
                )
        }
    }

    render() {
        return (
            <div>
                <this.props.header />
                <h3 className="general-h3">General Account Settings</h3>
                <main className="user-info-main">
                    <div className="user-info-div">
                        <div className="user-form-box">
                            <form>
                                <p className="input-container">
                                    <label htmlFor="val-input" className="val-label">First Name: </label>
                                    <input onChange={this.saveUserInfo} id="first_name" name="first_name" className="val-input" type="text" defaultValue={this.state.first_name} />
                                </p>
                                <p className="input-container">
                                    <label htmlFor="val-input" className="val-label">Last Name: </label>
                                    <input onChange={this.saveUserInfo} id="last_name" name="last_name" className="val-input" type="text" defaultValue={this.state.last_name} />
                                </p>
                                <p className="input-container">
                                    <label htmlFor="val-input" className="val-label">Birthday: </label>
                                    <input onChange={this.saveUserInfo} id="birthday" name="birthday" className="val-input" type="date" defaultValue={this.state.birthday} />
                                </p>
                                <p className="input-container">
                                    <label htmlFor="val-input" className="val-label">Email: </label>
                                    <input onChange={this.saveUserInfo} id="email" name="email" className="val-input" type="email" defaultValue={this.state.email} />
                                </p>
                                <p className="input-container">
                                    <label htmlFor="val-input" className="val-label">Country: </label>
                                    <input onChange={this.saveUserInfo} id="country" name="country" className="val-input" type="text" defaultValue={this.state.country} />
                                </p>
                                <p className="input-container">
                                    <label htmlFor="val-input" className="val-label">Telephone: </label>
                                    <input onChange={this.saveUserInfo} id="telephone" name="telephone" className="val-input" type="text" defaultValue={this.state.telephone} />
                                </p>
                                <Link to='/products'>
                                    <button className="save-btn" onClick={this.updateUserInfo}>Save Settings</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className="new-product-div">
                        <span><i className="fas fa-plus-circle"></i></span>
                        <h3>You are changing your user account settings</h3>
                    </div>
                </main>
            </div>
        )
    }
}

export default UserInfo

