import React from 'react'
import Admin from '../../components/admin'
import { getValuesFromQueryString } from '../../util/string'

const AdminPage = () => {
    const sections = [
        {name: 'Clientes', icon: 'mood'},
        {name: 'Funcionários', icon: 'assignmentind'},
        {name: 'Insumos', icon: 'shoppingbasket'},
        {name: 'Lotes', icon: 'formatlistbulleted'},
        {name: 'Pedidos', icon: 'description'},
        {name: 'Produtos', icon: 'assignment'},
        {name: 'Relatórios', icon: 'assessment'},
    ]
    return (
        <Admin
            sections={sections}
            initialValues={getValuesFromQueryString()}
        />
    )
}
    

export default AdminPage