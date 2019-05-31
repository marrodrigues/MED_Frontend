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
    }
}


export default InsumoProvider