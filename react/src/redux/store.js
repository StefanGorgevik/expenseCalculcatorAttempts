import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import {productReducer} from './reducers/productReducer.js'

const store = createStore(
    productReducer,
    applyMiddleware(logger));

export default store;