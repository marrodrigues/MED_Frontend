import axios from 'axios'
import { params } from '../util/request'

const InsumoProvider = {
    getAll: (callback) => {
        axios.get('https://med-backend-dev.herokuapp.com/insumos', params)
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
    createOrUpdate: (data, callback) => {
        if (data.id) {
            axios.put('https://med-backend-dev.herokuapp.com/insumos/' + data.id, data ,params)
                .then(response => {
                    debugger
                })
                .catch(error => {
                    debugger
                })
        } else {
            axios.post('https://med-backend-dev.herokuapp.com/insumos/', data ,params)
            .then(response => {
                debugger
            })
            .catch(error => {
                debugger
            })
        }
    },

}


export default InsumoProvider