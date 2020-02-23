import React from 'react'
import MergedTable from '../../components/MergedTable/MergedTable/MergedTable'
import './MergedTableContainer.css'
import store from '../../redux/store'
import {mergeTables} from '../../redux/actions/productAction'

class MergedTableContainer extends React.Component {
    goBackHandler = () => {
        store.dispatch(mergeTables(false));
    }
    render() {
        return (
            <div className="merged-table-container">
                <h1>Merged Products for {localStorage.getItem('first_name')} and {localStorage.getItem('second-first_name')}</h1>
                <button className="go-back-btn" onClick={this.goBackHandler}>Go back</button>
                <MergedTable/>
            </div>
        )
    }
}

export default MergedTableContainer;