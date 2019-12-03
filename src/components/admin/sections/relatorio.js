import React, { useState, useEffect } from 'react'
import { Container, SectionTitle, TabsAndFilter, TabsContainer, Tab } from './baseSection'
import { REPORT_TABS } from '../../../util/constants'
import { InputWithLabel } from '../../base'
import InsumoForm from '../../forms/InsumoForm'
import DataTable from './DataTable'
import ProductReport from "../../reports/product";
import ClientReport from "../../reports/cliente";
import EmployeeReport from "../../reports/funcionario";

const RelatorioSection = ({ supplyList = [], ...props }) => {
    const [selectedTab, setSelectedTab] = useState(REPORT_TABS[0])

    // const [filter, setFilter] = useState('')
    // const filterCallback = supply => (
    //     supply.descricao.includes(filter)
    //     || supply.unidade.includes(filter)
    //     || supply.qtd_unid.includes(filter)
    // )
    // const fields = [ 'descricao', 'qtd_unid', 'unidade' ]
    // const mapCallback = supply => (
    //     <tr key={supply.descricao} onClick={() => { setSelectedSupply(supply) }}>
    //         {fields.map(field => <td key={`${field}-${supply.descricao}`}>{supply[field]}</td>)}
    //     </tr>
    // )

    const renderContent = () => {
        switch (selectedTab) {
            case REPORT_TABS[0]:
                return <ProductReport />
            case REPORT_TABS[1]:
                return <ClientReport />
            case REPORT_TABS[2]:
                return <EmployeeReport/>
            default:
                return null
        }
    }
    return (
        <Container>
            <SectionTitle>Relatórios</SectionTitle>
            <TabsAndFilter>
                <TabsContainer>
                    {REPORT_TABS.map(tab =>
                        <Tab
                            isSelected={selectedTab === tab}
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </Tab>
                    )}
                </TabsContainer>
            </TabsAndFilter>
            {renderContent()}
        </Container>
    )
}

export default RelatorioSection