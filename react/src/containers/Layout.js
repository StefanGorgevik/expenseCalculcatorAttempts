import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../components/Navigation/Header'
import Expenses from '../components/Calculator/Expenses'
import Products from '../components/Calculator/Products'
import NewProduct from '../components/Product/NewProduct'
import EditProduct from '../components/Product/EditProduct'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'
import Table from '../components/Table/Table'

class Layout extends Component {
    render() {
        return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/products" render={() =><Products header={Header} table={Table}/>} />
                <Route exact path="/expenses" render={() => <Expenses header={Header} table={Table}/>} />
                <Route exact path="/new-product" render={() => <NewProduct header={Header} table={Table}/>} />
                <Route exact path="/edit-product" render={() => <EditProduct header={Header} table={Table}/>} />
            </Switch>
        </Router>
        )
    }
}

export default Layout