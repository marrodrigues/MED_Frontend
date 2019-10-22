export const ACTIONS = {
    SET_LOGGED_USER: 'SET_LOGGED_USER',
    SET_LOADING: 'SET_LOADING',
    SET_NOT_LOADING: 'SET_NOT_LOADING'
}

export function setLoggedUser(loggedUser) {
    return {
        type: ACTIONS.SET_LOGGED_USER,
        loggedUser
    };
}

export function setLoading() {
    return {
        type: ACTIONS.SET_LOADING,
    }
}

export function setNotLoading() {
    return {
        type: ACTIONS.SET_NOT_LOADING,
    }
}