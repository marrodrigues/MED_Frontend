import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { ADMIN_TABS } from '../../../util/constants'
import { InputWithLabel, BaseForm } from '../../base'
import { ButtonOrSpinner } from '../../base/button'

const StyledBaseForm = styled(BaseForm)`
    max-width: 330px;
`

const InsumoSection = ({ ...props }) => {
    const [selectedTab, setSelectedTab] = useState(ADMIN_TABS[1])
    const [filter, setFilter] = useState('')
    const [descricao, setDescricao] = useState('')
    const [qtd_unid, setQtdUnidade] = useState('')
    const [unidade, setUnidade] = useState('')
    const [errors, setErrors] = useState({})

    const renderContent = () => {
        switch (selectedTab) {
            case ADMIN_TABS[0]:
                return (null)
            case ADMIN_TABS[1]:
                return (
                    <StyledBaseForm key='insumo-form' id='insumo-form' {...props} >
                        <InputWithLabel
                            label='Descrição'
                            value={descricao}
                            onChange={setDescricao}
                        />
                        <InputWithLabel
                            label='Quantidade por unidade'
                            value={qtd_unid}
                            onChange={setQtdUnidade}
                            type='number'
                        />
                        <InputWithLabel
                            label='Unidade'
                            value={unidade}
                            onChange={setUnidade}
                        />
                        <ButtonOrSpinner label='Cadastrar' />
                    </StyledBaseForm>
                )
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Insumos</SectionTitle>
            <TabsAndFilter>
                <TabsContainer>
                    {ADMIN_TABS.map(tab =>
                        <Tab
                            isSelected={selectedTab === tab}
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </Tab>
                    )}
                </TabsContainer>
                {selectedTab === ADMIN_TABS[0] &&
                    <InputWithLabel
                        label='Filtrar'
                        value={filter}
                        onChange={setFilter}
                    />}
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default InsumoSection