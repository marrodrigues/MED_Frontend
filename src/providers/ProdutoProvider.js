import axios from 'axios'
import { params } from '../util/request'

const ProdutoProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/produtos', params)
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
    getByNameAndSize: (product, productExistsCallback, productDoesNotExistCallback, errorCallback) => {
        axios.get(`https://med-backend-dev.herokuapp.com/produtos/nome/${product.nome}/tamanho/${product.tamanho}`, params)
            .then(response => response.data)
            .then(data => {
                productExistsCallback(data)
            })
            .catch(error => { 
                // // // debugger
                if (error.response.status === 404) {
                    productDoesNotExistCallback()
                } else {
                    errorCallback('Erro inesperado')
                }
            })
    },
    delete: (id, callback) => {
        axios.delete('https://med-backend-dev.herokuapp.com/produtos/' + id, params)
            .then(response => {
                // // debugger
            })
            .catch(error => {
                // // debugger
            })
    },
    createOrUpdate: (data, callback) => {
        // // debugger
        if (data.id) {
            axios.put('https://med-backend-dev.herokuapp.com/produtos/' + data.id, data, params)
                .then(response => {
                    debugger
                })
                .catch(error => {
                    debugger
                })
        } else {
            axios.post('https://med-backend-dev.herokuapp.com/produtos/', data, params)
                .then(response => {
                    debugger
                })
                .catch(error => {
                    debugger
                })
        }
    },
}


export default ProdutoProvider