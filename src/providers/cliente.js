import axios from 'axios'
import { params } from '../util/request'
import ClienteFactory from '../factories/cliente'

const ClienteProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/clientes', params)
            .then(result => result.data)
            .then(data => {
                console.log(data)
                // // debugger
                callback(data)
            })
            .catch(error => {
                console.log(error)
                // // debugger
            })
    },
    newClient: (formData, callback) => {
        const newClient = ClienteFactory.createCliente(formData)
        // axios.post()
    },
    changePassword: (formData, callback) => {
        console.log('Change Password')
    }
}


export default ClienteProvider