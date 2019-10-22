import axios from 'axios'
import { params } from '../util/request'
import ClienteFactory from '../factories/cliente'

const ClienteProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/clientes', params)
            .then(result => result.data)
            .then(data => {
                console.log(data)
                // // // // debugger
                callback(data)
            })
            .catch(error => {
                console.log(error)
                // // // // debugger
            })
    },
    // newClient: (formData, callback) => {
    //     const newClient = ClienteFactory.createCliente(formData)
    //     // axios.post()
    // },
    changePassword: (formData, callback) => {
        console.log('Change Password')
    },
    createOrUpdate: (data, callback) => {
        const clienteObj = ClienteFactory.createCliente(data)
        // // debugger
        if (clienteObj.id) {
            axios.put('https://med-backend-dev.herokuapp.com/clientes/' + clienteObj.id, clienteObj, params)
                .then(response => {
                    // // debugger
                    callback()
                })
                .catch(error => {
                    // // debugger
                })
        } else {
            axios.post('https://med-backend-dev.herokuapp.com/clientes/', clienteObj, params)
                .then(response => {
                    // // debugger
                    callback()
                })
                .catch(error => {
                    // // debugger
                })
        }
    },
    delete: (id, callback) => {
        axios.delete('https://med-backend-dev.herokuapp.com/clientes/' + id, params)
            .then(response => {
                // // debugger
            })
            .catch(error => {
                // // debugger
            })
    },
}


export default ClienteProvider