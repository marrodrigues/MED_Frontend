import axios from 'axios'
import config from '../config'
import { PATHS, KEYS } from '../util/constants'

const createClienteObj = ({
        bairro,
        cep,
        cidade,
        complemento,
        cpf,
        email,
        login,
        logradouro,
        nascimento,
        nome,
        numero,
        senha,
        telefone,
        uf 
    }) => {
        let clienteObj = { flag_bloqueado: 0, pessoa: {} }
        clienteObj.pessoa = {
            cpf,
            dataNascimento: nascimento,
            email,
            login,
            nome,
            senha,
            endereco: [{
                logradouro,
                numero,
                complemento,
                CEP: cep,
                bairro,
                cidade,
                uf
            }],
            telefone: [{
                DDD: 21,
                numero_telefone: telefone,
                tipo: 'celular'
            }]
        }
        return clienteObj
}

const UserProvider = {
    create: (formData) => {
        const clienteObj = createClienteObj(formData)
        debugger
        console.log(clienteObj, JSON.stringify(clienteObj))
        axios.post(config.API_ENDPOINT + PATHS.USERS, clienteObj /*, { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyLCJpYXQiOjE1NTYyODU2MTF9.c7mSyUxFaG-y2NL0ADHt5fgq1XPLk8sFtU0vBliUikg', "Content-Type": 'application/json'}*/)
            .then(result => {
                debugger
            })
            .catch(error => {
                debugger 
                console.log(error)
            })
    },
    login: ({login, senha}) => {
        return axios.post(config.API_ENDPOINT + PATHS.LOGIN, {login, senha})
            .then(result => {
                // console.log(result)
                debugger
                // return result.data.token
                // alert(`Login efetuado com sucesso\nToken: ${result.data.token}`)
                window.localStorage.setItem(KEYS.TOKEN, result.data.token)
                window.location.href = '/'
                return result.data
            })
            .catch(error => { 
                // debugger
                // console.log(error)
                alert('Usuário ou senha inválidos')
            })
        
    }, 
    logout: () => {
        // route signature 
        // .get('/logout', (req, res) => {res.status(200).send({ auth: false, token: null })})
        axios.get(config.API_ENDPOINT + PATHS.LOGOUT, { 
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTkyLCJpYXQiOjE1NTYyODU2MTF9.c7mSyUxFaG-y2NL0ADHt5fgq1XPLk8sFtU0vBliUikg',
            "Content-Type": 'application/json'
        })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error)
            })
    },
    update: (formData) => {
        let updateObj = { pessoa: { endereco: [{}], telefone: [{}] } }
        for (let key in formData) {
            let splittedKey = key.split('-')
            switch (splittedKey[0]) {
                case 'endereco':
                case 'telefone':
                    updateObj.pessoa[splittedKey[0]][0][splittedKey[1]] = formData[key]
                    break
                case 'pessoa':
                    updateObj.pessoa[splittedKey[1]] = formData[key]
                    break
                case 'user':
                    updateObj[splittedKey[1]] = formData[key]
                    break
                default:
                    break
            }
        }
        console.log(updateObj);
        
        const params = { headers : {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE1NTYxNzY5MDR9.pUgD6sXF_DlRnJSNIVqHlKe9lrqjDVkZSNEWZpjPiUE',
            "Content-Type": 'application/json'
        }}
        const url = config.API_ENDPOINT + PATHS.USERS + updateObj.id
        console.log(url);
        debugger
        axios.put(url, updateObj, params)
            .then(result => {
                debugger
                console.log(result)
                window.location.reload()
            })
            .catch(error => {
                debugger
                console.log(error)
            })
    }
}
const rootObjs = ['endereco', 'pessoa', 'telefone', 'user']
// {
//     "id": 12,
//     "pessoa": {
//         "id": 32,-> pessoaid
//         "cpf": "12731272312",
//         "nome": "Alinne Breves Rodrigues",
//         "login": "arline",
//         "senha": "",
//         "email": "alinne.bds@gmail.com",
//         "dataNascimento": "1995-08-05",
//         "endereco": [{
//             "id": 32, -> pessoaid
//             "logradouro": "Rua do Niquel",
//             "numero": "25",
//             "complemento": "Quadra 88",
//             "CEP": "22711350",
//             "bairro": "Curicica",
//             "cidade": "Rio de Janeiro",
//             "UF": "RJ",
//             "pessoaId": 32 -> pessoaid
//         }],
//         "telefone": [{
//             "id": 32, -> pessoaid
//             "DDD": 21,
//             "numero_telefone": "98788-0000",
//             "tipo": "celular",
//             "pessoaId": 32 -> pessoaid
//         }]
//     }
// }

export default UserProvider