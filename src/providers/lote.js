import axios from 'axios'
import { params } from '../util/request'

const InsumoProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/lotes/', params)
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
    getByBundle: (bundle, bundleExistsCallback, bundleDoesNotExistCallback, errorCallback) => {
        axios.get('https://med-backend-dev.herokuapp.com/lotes/lote/' + bundle, params)
            .then(response => response.data)
            .then(data => {
                bundleExistsCallback(data)
            })
            .catch(error => { 
                // debugger
                if (error.response.status === 404) {
                    bundleDoesNotExistCallback()
                } else {
                    errorCallback('Erro inesperado')
                }
            })
    }
}

export default InsumoProvider