import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClienteForm from '../../forms/ClienteForm'
import { PESSOA_DEFAULT_VALUE } from '../../../util/constants'

const Container = styled.section`

`

const MeusDadosSection = ({ initialValues, clientList }) => {
    const [selectedClient, setSelectedClient] = useState(null)
    useEffect(() => {
        const client = (clientList || []).find(client => client && client.pessoa && client.pessoa.id === Number(initialValues.id))
        setSelectedClient(client)
    }, [clientList, selectedClient])
    return (
        <Container>
            {selectedClient &&
            <ClienteForm title="Meus Dados" selectedClient={selectedClient} />}
        </Container>
    )
}

export default MeusDadosSection