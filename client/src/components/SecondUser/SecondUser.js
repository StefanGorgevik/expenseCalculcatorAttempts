import React from 'react'
import './SecondUser.css'
import SecondUserTable from './SecondUserTable/SecondUserTable'

import store from '../../redux/store'
import { addAccountClicked, secondUserSigned } from '../../redux/actions/userAction'
import SecondUserSignOut from './SecondUserSignOut/SecondUserSignOut'

class SecondUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signOutClicked: false
        }
    }

    signOutClickedHandler = () => {
        console.log('1')
        this.setState({ signOutClicked: true })
    }

    hideSignOutHandler = () => {
        console.log('2')
        this.setState({ signOutClicked: false })
    }

    signOutSecondUser = () => {
        console.log('3')
        let keysToRemove = ["second-jwt", "second-first_name","second-last_name","second-email","second-userid"];
        keysToRemove.forEach(k => {
            localStorage.removeItem(k);
        })
        store.dispatch(secondUserSigned(false))
        store.dispatch(addAccountClicked(false))
        this.setState({ signOutClicked: false })
    }

    render() {
        const name = localStorage.getItem('second-first_name') + ' ' + localStorage.getItem('second-last_name')
        return (
            <div className="second-user">
                 {this.state.signOutClicked ? <SecondUserSignOut hide={this.hideSignOutHandler}
                    signOutAccepted={this.signOutSecondUser}
                /> : null}
                <div className="second-user-header">
                    <h1>{name}</h1>
                    <button onClick={this.signOutClickedHandler} className="second-user-sign-out-btn">Sign Out</button>
                </div>

                <SecondUserTable />
               
            </div>
        )
    }
}

export default SecondUser;