import React from 'react'
import styled from 'styled-components'
import SupplyForm from '../../forms/supply'

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
const SupplyTable = styled.table`
   tr {
    font-size: 18px;
    text-transform: capitalize;
    :hover {
        cursor: pointer;
        color: black;
        // font-weight: bold;
        background-color: #CCC9F7;
    }
    :nth-child(even){
        background-color: #f2f2f2;
    }
`

const tabs = ['Formulário', 'Lista']

export default class InsumoSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedSupply: {},
            selectedTab: tabs[0],
        }
    }
    
    selectSupply(selectedSupply) {
        // // // // debugger
        console.log(selectedSupply)
        this.setState({selectedSupply, selectedTab: 'Formulário'})
    }
    selectTab(tab) {
        console.log(tab)
        this.setState({selectedTab: tab})
    }
    render() {
        const { supplyList } = this.props || []
        console.log(supplyList, this.state)
        return (
            <React.Fragment>
                <h1>Insumos</h1>
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
                {
                    this.state.selectedTab === 'Formulário' && 
                    <SupplyForm selectedSupply={this.state.selectedSupply} />
                }
                {
                    supplyList.length && this.state.selectedTab === 'Lista' &&
                    <SupplyTable>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Unidade</th>
                                <th>Quantidade por Unidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                supplyList.map(supply => (
                                    <tr key={supply.id} onClick={() => { this.selectSupply(supply) }}>
                                        <td>{supply.descricao}</td>
                                        <td>{supply.unidade}</td>
                                        <td>{supply.qtd_unid}</td>
                                    </tr>        
                                ))
                            }
                        </tbody>
                    </SupplyTable>
                }
                {/* {
                    this.state.selectedTab === 'Lista' &&
                    <ul className='name-list'>
                        { supplyList.map(supply => <li onClick={() => this.selectSupply(supply)} key={supply.id}>{supply.descricao}</li>) }
                    </ul>
                } */}
                
                {/* <ul className='attr-list'>
                    {this.state.selectedSupply.id && this.renderSupplyInfo() }
                </ul> */}
            </React.Fragment>
        )
    }
}