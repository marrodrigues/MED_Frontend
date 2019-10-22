import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
    font-size: 18px;
    font-family: HelveticaNeue;
    border-collapse: collapse;
    table, th, td {
        border: 1px solid black;
    }
    tr:not(.header) {
        :nth-child(even) {
            background-color: #f2f2f2;
        }
        :hover {
                cursor: pointer;
                color: black;
                background-color: #CCC9F7;
        }
    }
`
const DataTable = ({ data, filter, filterCallback, mapCallback }) => {
    const filteredData = filter ? data.filter(filterCallback) : data
    console.log(filteredData)
    return (
        <Table>
            <thead>
                <tr className='header'>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredData.map(mapCallback)
                }
            </tbody>
        </Table>
    )
}

export default DataTable