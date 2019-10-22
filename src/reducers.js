import { combineReducers } from 'redux';
import { ACTIONS } from './actions'

export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        app: appReducers,
        user: userReducers,
        ...injectedReducers,
    });

    return rootReducer;
}

const userReducers = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOGGED_USER:
            return { ...state, loggedUser: action.loggedUser }
        default:
            return state
    }
}

const appReducers = (state = {}, action) => {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: true }
        case ACTIONS.SET_NOT_LOADING:
            return { ...state, loading: false }
        default:
            return state
    }
}