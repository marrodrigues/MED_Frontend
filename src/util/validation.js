import axios from "axios"
import config from "../config"
import { ALLOWED_CITY, ALLOWED_DISTRICTS } from "./constants"
import { params } from '../util/request'

const validateCep = (cep) => axios.get(config.VIA_CEP_ENDPOINT + cep + config.VIA_CEP_JSON)


const isLocationValid = ({ localidade, bairro }) => {
    return localidade === ALLOWED_CITY && ALLOWED_DISTRICTS.includes(bairro)
}

const validateEmail = (email) => axios.get('https://med-backend-dev.herokuapp.com/pessoas/email/' + email)

const validateLogin = (login) => axios.get('https://med-backend-dev.herokuapp.com/pessoas/login/' + login)

const validateCpf = (cpf) => axios.get('https://med-backend-dev.herokuapp.com/pessoas/cpf/' + cpf)

const validateDescricao = (descricao) => axios.get('https://med-backend-dev.herokuapp.com/insumos/descricao/' + descricao, params)

const validateLote = (lote) => axios.get('https://med-backend-dev.herokuapp.com/lotes/lote/' + lote, params)

export { validateCep, isLocationValid, validateEmail, validateLogin, validateCpf, validateDescricao, validateLote }