import React from 'react'
import styled from 'styled-components'

export default class FuncionarioSection extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedEmployee: {}
        }
    }
    
    renderEmployeeInfo() {
        const { selectedEmployee } = this.state
        console.log(selectedEmployee)
        let employeeInfo = []
        // debugger
        for(let prop of Object.keys(selectedEmployee)) {
            if (selectedEmployee[prop]) {
                employeeInfo.push((<li>{`${prop}:${selectedEmployee[prop]}`}</li>))
            }
        } 
        for(let prop of Object.keys(selectedEmployee.pessoa)) {
            if (selectedEmployee.pessoa[prop]) {
                employeeInfo.push((<li>{`${prop}:${selectedEmployee.pessoa[prop]}`}</li>))
            }
        }
        console.log(employeeInfo, selectedEmployee)
        return employeeInfo
    }
    selectEmployee(selectedEmployee) {
        // debugger
        console.log(selectedEmployee)
        this.setState({selectedEmployee})
    }
    render() {
        const { employeeList } = this.props || []
        console.log(employeeList, this.state)
        return (
            <React.Fragment>
                <h1>Funcionário</h1>
                <ul className='name-list'>
                    { employeeList.map(employee => <li onClick={() => this.selectEmployee(employee)} key={employee.id}>{employee.pessoa.nome}</li>) }
                </ul>
                <ul className='attr-list'>
                    {this.state.selectedEmployee.id && this.renderEmployeeInfo() }
                </ul>
            </React.Fragment>
        )
    }
}