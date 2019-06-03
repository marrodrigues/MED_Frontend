import axios from 'axios'
import { params } from '../util/request'

const LoteProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/lotes/', params)
            .then(result => result.data)
            .then(data => {
                console.log(data)
                // // // debugger
                callback(data)
            })
            .catch(error => {
                console.log(error)
                // // // debugger
            })
    },
    getByBundle: (bundle, bundleExistsCallback, bundleDoesNotExistCallback, errorCallback) => {
        axios.get('https://med-backend-dev.herokuapp.com/lotes/lote/' + bundle, params)
            .then(response => response.data)
            .then(data => {
                bundleExistsCallback(data)
            })
            .catch(error => { 
                // // debugger
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
                // debugger
            })
            .catch(error => {
                // debugger
            })
    },
    createOrUpdate: (data, callback) => {
        // debugger
        if (data.id) {
            axios.put('https://med-backend-dev.herokuapp.com/lotes/' + data.id, data, params)
                .then(response => {
                    // debugger
                })
                .catch(error => {
                    // debugger
                })
        } else {
            axios.post('https://med-backend-dev.herokuapp.com/lotes/', data, params)
                .then(response => {
                    // debugger
                })
                .catch(error => {
                    // debugger
                })
        }
    },
}

export default LoteProvider