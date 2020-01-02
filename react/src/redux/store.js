import { createStore } from 'redux'

import { productReducer } from './reducers/productReducer.js.js'

const store = createStore(productReducer);

export default store;