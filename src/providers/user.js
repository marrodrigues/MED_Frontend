import axios from 'axios'
import config from '../config'
import { PATHS, KEYS } from '../util/constants'
import { params } from '../util/request'

const createClienteObj = ({
        bairro,
        CEP,
        cidade,
        complemento,
        cpf,
        email,
        login,
        logradouro,
        dataNascimento,
        nome,
        numero,
        senha,
        numero_telefone,
        uf 
    }) => {
        let clienteObj = { flag_bloqueado: 0, pessoa: {} }
        clienteObj.pessoa = {
            cpf,
            dataNascimento,
            email,
            login: login || email,
            nome,
            senha,
            endereco: [{
                logradouro,
                numero,
                complemento,
                CEP,
                bairro,
                cidade,
                uf
            }],
            telefone: [{
                DDD: 21,
                numero_telefone,
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
        axios.post(config.API_ENDPOINT + PATHS.USERS, clienteObj )
            .then(result => {
                // // // debugger
            })
            .catch(error => {
                // // // debugger 
                console.log(error)
            })
    },
    login: ({login, senha}) => {
        return axios.post(config.API_ENDPOINT + PATHS.LOGIN, {login, senha})
            .then(result => {
                // console.log(result)
                // // // debugger
                // return result.data.token
                // alert(`Login efetuado com sucesso\nToken: ${result.data.token}`)
                window.localStorage.setItem(KEYS.TOKEN, result.data.token)
                // window.location.href = '/'
                return result.data
            })
            .catch(error => { 
                // // // // debugger
                // console.log(error)
            //     alert('Usuário ou senha inválidos')
            })
        
    }, 
    logout: () => {
        // route signature 
        // .get('/logout', (req, res) => {res.status(200).send({ auth: false, token: null })})
        axios.get(config.API_ENDPOINT + PATHS.LOGOUT, params)
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
        debugger
        const url = config.API_ENDPOINT + PATHS.USERS + updateObj.id
        console.log(url);
        // // // debugger
        axios.put(url, updateObj, params)
            .then(result => {
                // // // debugger
                console.log(result)
                window.location.reload()
            })
            .catch(error => {
                // // // debugger
                console.log(error)
            })
    }
}

export default UserProvider