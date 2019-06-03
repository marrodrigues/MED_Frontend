import React from 'react'
import styled from 'styled-components'
import BundleForm from '../../forms/bundle'

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

const tabs = ['Formulário', 'Lista']

export default class LoteSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedBundle: {},
            selectedTab: tabs[0],
        }
    }
    
    selectBundle(selectedBundle) {
        // // // debugger
        console.log(selectedBundle)
        this.setState({selectedBundle, selectedTab: 'Formulário'})
    }
    selectTab(tab) {
        console.log(tab)
        this.setState({selectedTab: tab})
    }
    render() {
        const { bundleList } = this.props || []
        console.log(bundleList, this.state)
        return (
            <React.Fragment>
                <h1>Lotes</h1>
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
                    <BundleForm selectedBundle={this.state.selectedBundle} />
                }
                {
                    this.state.selectedTab === 'Lista' &&
                    <ul className='name-list'>
                        { bundleList.map(bundle => <li onClick={() => this.selectBundle(bundle)} key={bundle.id}>{bundle.lote}</li>) }
                    </ul>
                }
                
                {/* <ul className='attr-list'>
                    {this.state.selectedBundle.id && this.renderBundleInfo() }
                </ul> */}
            </React.Fragment>
        )
    }
}