import { KEYS } from '../util/constants'
const SessionProvider = {
    getKey: (key) => {
        return window.localStorage.getItem(KEYS.TOKEN)
    }, 
    setKey: (key, value) => {
        window.localStorage.setItem(key, value)
    },
    checkKey: (key) => {
        return !!window.localStorage.getItem(KEYS.TOKEN)
    }
}

export default SessionProvider