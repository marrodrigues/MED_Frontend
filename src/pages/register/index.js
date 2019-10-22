import React from 'react'
import Admin from '../../components/admin'
import { getValuesFromQueryString } from '../../util/string'

const RegisterPage = () => {
    return (
        <Admin
            sections={[{name: 'Registro', icon: 'personadd'}]}
            initialValues={getValuesFromQueryString()}
        />
    )
}
    

export default RegisterPage