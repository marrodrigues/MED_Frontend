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
    update: (id, formData) => {
        const clienteObj = createClienteObj(formData)
        axios.put(config.API_ENDPOINT + PATHS.USERS + id, clienteObj)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default UserProvider