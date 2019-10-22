import axios from 'axios'
import { params } from '../util/request'
import FuncionarioFactory from '../factories/funcionario'

const FuncionarioProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/funcionarios/', params)
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
    newClient: (formData, callback) => {
        const newClient = FuncionarioFactory.createFuncionario(formData)
        // axios.post()
    },
    changePassword: (formData, callback) => {
        console.log('Change Password')
    },
    createOrUpdate: (data, callback) => {
        const funcionarioObj = FuncionarioFactory.createFuncionario(data)
        // // debugger
        if (funcionarioObj.id) {
            axios.put('https://med-backend-dev.herokuapp.com/funcionarios/' + funcionarioObj.id, funcionarioObj, params)
                .then(response => {
                    // // debugger
                })
                .catch(error => {
                    // // debugger
                })
        } else {
            axios.post('https://med-backend-dev.herokuapp.com/funcionarios/', funcionarioObj, params)
                .then(response => {
                    // // debugger
                })
                .catch(error => {
                    // // debugger
                })
        }
    },
    delete: (id, callback) => {
        axios.delete('https://med-backend-dev.herokuapp.com/funcionarios/' + id, params)
            .then(response => {
                // // debugger
            })
            .catch(error => {
                // // debugger
            })
    },
}


export default FuncionarioProvider