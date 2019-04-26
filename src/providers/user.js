import axios from 'axios'
import config from '../config'
import { PATHS, KEYS } from '../util/constants'

const createClienteObj = (data) => {
    let clienteObj = {}

}

const UserProvider = {
    create: () => {

    },
    login: ({login, senha}) => {
        return axios.post(config.API_ENDPOINT + PATHS.LOGIN, {login, senha})
            .then(result => {
                // console.log(result)
                // debugger
                // return result.data.token
                alert(`Login efetuado com sucesso\nToken: ${result.data.token}`)
                window.localStorage.setItem(KEYS.TOKEN, result.data.token)
                window.location.href = '/'
            })
            .catch(error => { 
                // debugger
                // console.log(error)
                alert('Usuário ou senha inválidos')
            })
        
    }
}

export default UserProvider