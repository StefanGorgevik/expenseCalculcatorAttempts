import React from 'react'
import './SecondUser.css'
import SecondUserTable from '../../components/SecondUser/SecondUserTable/SecondUserTable'
import store from '../../redux/store'
// import { addAccountClicked, secondUserSigned} from '../../redux/actions/userAction'
import { mergeTables, secondSignOutClicked } from '../../redux/actions/productAction'
class SecondUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    signOutClickedHandler = () => {
        store.dispatch(secondSignOutClicked(true))
    }

    // hideSignOutHandler = () => {
    //     store.dispatch(SecondUserSignOut(false))
    // }

    // signOutSecondUser = () => {
    //     let keysToRemove = ["second-jwt", "second-first_name", "second-last_name", "second-email", "second-userid"];
    //     keysToRemove.forEach(k => {
    //         localStorage.removeItem(k);
    //     })
    //     store.dispatch(secondUserSigned(false))
    //     store.dispatch(addAccountClicked(false))
    //     store.dispatch(SecondUserSignOut(false))
    // }

    mergeTables = () => {
        store.dispatch(mergeTables(true, "name"));
    }

    render() {
        const name = localStorage.getItem('second-first_name') + ' ' + localStorage.getItem('second-last_name')
        return (
            <div className="second-user">
                <div className="second-user-header">
                    <h1>{name}</h1>
                    <button onClick={this.signOutClickedHandler} className="second-user-sign-out-btn">Sign Out</button>
                    <button onClick={this.mergeTables} className="merge-tables-btn">Merge Tables</button>
                </div>
                <SecondUserTable />
                {/* {this.state.signOutClicked ? <SecondUserSignOut hide={this.hideSignOutHandler}
                    signOutAccepted={this.signOutSecondUser}
                /> : null} */}
            </div>
        )
    }
}

export default SecondUser;