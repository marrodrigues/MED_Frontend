import axios from "axios"
import config from "../config"
import { ALLOWED_CITY, ALLOWED_DISTRICTS } from "./constants"

const validateCep = (cep) => {
    if (cep.length < 9) { return {} }

    return axios.get(config.VIA_CEP_ENDPOINT + cep + config.VIA_CEP_JSON)
}

const isLocationValid = ({ localidade, bairro }) => {
    return localidade === ALLOWED_CITY && ALLOWED_DISTRICTS.includes(bairro)
}

export { validateCep, isLocationValid }