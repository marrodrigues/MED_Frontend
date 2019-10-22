import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import createReducer from './reducers'


const configureStore = (initialState = {}, injectedReducers) => {
    const middlewares = [thunk]

    const enhancers = [applyMiddleware(...middlewares)]

    const composeEnhancers = composeWithDevTools({})

    const store = createStore(
        createReducer(injectedReducers),
        initialState,
        composeEnhancers(...enhancers)
    )

    return store
}

export default configureStore
