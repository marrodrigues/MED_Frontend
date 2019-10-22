import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClienteForm from '../../forms/ClienteForm'
import { CLIENTE_DEFAULT_VALUE } from '../../../util/constants'

const Container = styled.section`

`

const MeusDadosSection = ({ initialValues, clientList }) => {
    const [selectedClient, setSelectedClient] = useState(CLIENTE_DEFAULT_VALUE)
    useEffect(() => {
        const client = (clientList || []).find(client => client && client.pessoa && client.pessoa.id === Number(initialValues.id))
        setSelectedClient((client && client.pessoa) || CLIENTE_DEFAULT_VALUE)
    }, [clientList, initialValues])
    return (
        <Container>
            <ClienteForm title="Meus Dados" selectedClient={selectedClient} />
        </Container>
    )
}

export default MeusDadosSection