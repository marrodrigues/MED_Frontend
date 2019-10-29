import axios from "axios"
import config from "../config"
import { ALLOWED_CITY, ALLOWED_DISTRICTS } from "./constants"

const validateCep = (cep) => axios.get(config.VIA_CEP_ENDPOINT + cep + config.VIA_CEP_JSON)


const isLocationValid = ({ localidade, bairro }) => {
    return localidade === ALLOWED_CITY && ALLOWED_DISTRICTS.includes(bairro)
}

const validateEmail = (email) => axios.get('https://med-backend-dev.herokuapp.com/pessoas/email/' + email)

const validateLogin = (login) => axios.get('https://med-backend-dev.herokuapp.com/pessoas/login/' + login)

export { validateCep, isLocationValid, validateEmail, validateLogin }