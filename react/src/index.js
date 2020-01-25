import React from 'react'
import ReactDOM from 'react-dom'

import Layout from '../../client/src/containers/Layout'
import store from '../../client/src/redux/store'
import { Provider } from 'react-redux'

const main = document.querySelector("#main")

ReactDOM.render(<Provider store={store}><Layout/></Provider>, main)