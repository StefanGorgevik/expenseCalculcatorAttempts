import React from 'react'
import './UserInfo.css'
import axios from 'axios';
import { Link } from 'react-router-dom'


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
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
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
        if (this.state.first_name.length === 0 && this.state.last_name.length === 0 &&
            this.state.email.length === 0 && this.state.birthday.length === 0 && this.state.country.length === 0 && this.state.telephone.length === 0) {
            alert('Please fill the fields!')
            event.preventDefault()
        } else {
            axios.put(`http://127.0.0.1:8006/app/v1/auth/user-info/${this.state.id}`, {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                date_of_birth: this.state.birthday,
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
                    localStorage.setItem('email', this.state.email)
                    localStorage.setItem('first_name', this.state.first_name)
                    localStorage.setItem('last_name', this.state.last_name)
                    console.log(localStorage.getItem('first_name'))
                    window.location.reload()
                })
                .catch((err) => {
                    console.log('here');
                    console.log(err.response);
                })
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

