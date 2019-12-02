import axios from 'axios'
import { params } from '../util/request'
import InsumoFactory from '../factories/insumo'
import {emptyFunction} from "../util/constants";

const InsumoProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/insumos', params)
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
    createOrUpdate: (data, callback = emptyFunction) => {
        const supplyObj = InsumoFactory.createInsumo(data)
        if (supplyObj.id) {
            axios.put('https://med-backend-dev.herokuapp.com/insumos/' + supplyObj.id, supplyObj, params)
                .then(response => {
                    debugger
                    callback()
                })
                .catch(error => {
                    debugger
                })
        } else {
            axios.post('https://med-backend-dev.herokuapp.com/insumos/', supplyObj, params)
                .then(response => {
                    debugger
                    callback()
                })
                .catch(error => {
                    debugger
                })
        }
    },
    delete: (id, callback = emptyFunction) => {
        axios.delete('https://med-backend-dev.herokuapp.com/insumos/' + id, params)
            .then(response => {
                // // debugger
                callback()
            })
            .catch(error => {
                // // debugger
            })
    },
    getByDescription: (description, supplyExistsCallback, supplyDoesNotExistCallback, errorCallback) => {
        axios.get('https://med-backend-dev.herokuapp.com/insumos/descricao/' + description, params)
            .then(response => response.data)
            .then(data => {
                supplyExistsCallback(data)
            })
            .catch(error => { 
                // // // debugger
                if (error.response.status === 404) {
                    supplyDoesNotExistCallback()
                } else {
                    errorCallback('Erro inesperado')
                }
            })
    }
}


export default InsumoProvider