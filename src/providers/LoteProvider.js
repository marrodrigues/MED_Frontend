import axios from 'axios'
import { params } from '../util/request'
import LoteFactory from '../factories/lote'

const LoteProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/lotes/', params)
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
    getByBundle: (bundle, bundleExistsCallback, bundleDoesNotExistCallback, errorCallback) => {
        axios.get('https://med-backend-dev.herokuapp.com/lotes/lote/' + bundle, params)
            .then(response => response.data)
            .then(data => {
                bundleExistsCallback(data)
            })
            .catch(error => { 
                // // // debugger
                if (error.response.status === 404) {
                    bundleDoesNotExistCallback()
                } else {
                    errorCallback('Erro inesperado')
                }
            })
    },
    delete: (id, callback) => {
        axios.delete('https://med-backend-dev.herokuapp.com/lotes/' + id, params)
            .then(response => {
                // // debugger
            })
            .catch(error => {
                // // debugger
            })
    },
    createOrUpdate: (data, callback) => {
        const loteObj = LoteFactory.createLote(data)
        // console.log(loteObj)
        // // debugger
        if (loteObj.id) {
            axios.put('https://med-backend-dev.herokuapp.com/lotes/' + loteObj.id, loteObj, params)
                .then(response => {
                    // // debugger
                })
                .catch(error => {
                    // // debugger
                })
        } else {
            axios.post('https://med-backend-dev.herokuapp.com/lotes/', loteObj, params)
                .then(response => {
                    // // debugger
                })
                .catch(error => {
                    // // debugger
                })
        }
    },
}

export default LoteProvider