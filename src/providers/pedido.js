import axios from 'axios'

const PedidoProvider = {
    getAll: (callback) => {
        const header ={ headers : {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyLCJpYXQiOjE1NTYxNzY5MDR9.pUgD6sXF_DlRnJSNIVqHlKe9lrqjDVkZSNEWZpjPiUE',
            "Content-Type": 'application/json'
        }}
        axios.get('https://med-backend-dev.herokuapp.com/pedidos', header)
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
    }
}


export default PedidoProvider