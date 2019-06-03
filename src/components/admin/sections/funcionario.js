import React from 'react'
import styled from 'styled-components'
import EmployeeForm from '../../forms/employee'

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

export default class FuncionarioSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedEmployee: {},
            selectedTab: tabs[0],
        }
    }
    
    // renderEmployeeInfo() {
    //     const { selectedEmployee } = this.state
    //     console.log(selectedEmployee)
    //     let employeeInfo = []
    //     // // // debugger
    //     for(let prop of Object.keys(selectedEmployee)) {
    //         if (selectedEmployee[prop]) {
    //             employeeInfo.push((<li>{`${prop}:${selectedEmployee[prop]}`}</li>))
    //         }
    //     } 
    //     for(let prop of Object.keys(selectedEmployee.pessoa)) {
    //         if (selectedEmployee.pessoa[prop]) {
    //             employeeInfo.push((<li>{`${prop}:${selectedEmployee.pessoa[prop]}`}</li>))
    //         }
    //     }
    //     console.log(employeeInfo, selectedEmployee)
    //     return employeeInfo
    // }
    selectEmployee(selectedEmployee) {
        // // // debugger
        console.log(selectedEmployee)
        this.setState({selectedEmployee, selectedTab: 'Formulário'})
    }
    selectTab(tab) {
        console.log(tab)
        this.setState({selectedTab: tab})
    }
    render() {
        const { employeeList } = this.props || []
        console.log(employeeList, this.state)
        return (
            <React.Fragment>
                <h1>Funcionário</h1>
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
                    <EmployeeForm selectedEmployee={this.state.selectedEmployee} />
                }
                {
                    this.state.selectedTab === 'Lista' &&
                    <ul className='name-list'>
                        { employeeList.map(employee => <li onClick={() => this.selectEmployee(employee)} key={employee.id}>{employee.pessoa.nome}</li>) }
                    </ul>
                }
                
                {/* <ul className='attr-list'>
                    {this.state.selectedEmployee.id && this.renderEmployeeInfo() }
                </ul> */}
            </React.Fragment>
        )
    }
}