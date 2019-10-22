import React from 'react'
import Admin from '../../components/admin'
import { getValuesFromQueryString } from '../../util/string'

const AdminPage = () => {
    const sections = [
        {name: 'Meus Dados', icon: 'edit'},
        {name: 'Meus Pedidos', icon: 'description'},
        {name: 'Alterar Senha', icon: 'lock'},
    ]
    return (
        <Admin
            sections={sections}
            initialValues={getValuesFromQueryString()}
        />
    )
}
    

export default AdminPage