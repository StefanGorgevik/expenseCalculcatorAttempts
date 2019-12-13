import React from 'react'
import ReactDOM from 'react-dom'

import Layout from './containers/Layout'

import store from './redux/store'
import { Provider } from 'react-redux'

const main = document.querySelector("#main")

// ReactDOM.render(<Layout />, main)
ReactDOM.render(<Provider store={store}><Layout /></Provider>, main)