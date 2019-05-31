import React from 'react'
import styled from 'styled-components'

import SupplyForm from '../../components/forms/supply'

const tabs = ['Cliente', 'Funcionário', 'Insumo', 'Lote', 'Pedido', 'Produto', 'Relatório']
const Container = styled.main`
    display: flex;
    flex-direction: column;
`
const Tabs = styled.div`
    display: flex;
    width: 100%;
    margin: 2vh 0;
`
const Tab = styled.span`
    font-size: 18px;
    padding: 1vh 2vw;
    border: 1px solid gray;
    &:not(:first-child) {
        border-left: none;
    }
    :hover {
        cursor: pointer;
    }
    ${props => props.isSelected
    ? `
        background: rgba(255, 0, 0, 0.3);
        color: black;
    `
    : ''
    };
`

export default class extends React.Component {
    state = {
        selectedTab: tabs[2]
    }
    selectTab(tab) {
        this.setState({selectedTab: tab})
    }
    renderContent() {
        switch(this.state.selectedTab) {
            case tabs[6]:
                return <div>Relatório Form</div>
            case tabs[5]:
                return <div>Produto Form</div>
            case tabs[4]:
                return <div>Pedido Form</div>
            case tabs[3]:
                    return <div>Lote Form</div>
            case tabs[2]:
                return <SupplyForm />
            case tabs[1]:
                return <div>Funcionário Form</div>
            case tabs[0]:
            default: 
                return <div>Cliente Form</div>
        }
    }

    render() {
        return (
            <Container>
                <Tabs>
                    {tabs.map(tab => 
                        <Tab 
                            isSelected={this.state.selectedTab === tab} 
                            key={tab}
                            onClick={() => this.selectTab(tab)}
                        >
                            {tab}
                        </Tab>
                    )}
                </Tabs>
                {this.renderContent()}
            </Container>
        )
    }
}