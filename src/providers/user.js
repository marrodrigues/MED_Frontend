import axios from 'axios'
import config from '../config'
import { PATHS, KEYS } from '../util/constants'

const createClienteObj = (data) => {
    let clienteObj = {}

}

// {
//     "cpf": 11111111111,
//     "pessoa": {
//         "nome": "Matheus",
//         "login": "matheus",
//         "senha": "123456",
//         "email": "matheus_cxp@hotmail.com",
//         "dataNascimento": "1993-03-09",
//         "endereco": [
//             {
//                 "logradouro": "Rua Calmon",
//                 "numero": "22",
//                 "complemento": "Quadra 88",
//                 "CEP": "22710560",
//                 "bairro": "Curicica",
//                 "cidade": "Rio de Janeiro",
//                 "UF": "RJ"
//             }
//         ],
//         "telefone": [
//             {
//                 "DDD": 21,
//                 "numero": "99999-0399",
//                 "tipo": "celular"
//             }
//         ]
//     }
// }

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