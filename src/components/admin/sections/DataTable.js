import React, { useState } from 'react'
import styled from 'styled-components'
import exportToPdf from "./exportToPdf";

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

const Export = styled.div`
    font-size: 18px;
    font-family: HelveticaNeue;
    margin-left: auto;
    margin-bottom: 12px;
    border: 1px solid black;
    padding: 1vh 1vw;
    :hover {
        cursor: pointer;
    }
`
const DataTable = ({ data, filterCallback = () => true, mapCallback, fields, showFilters, updateFilterValues, filterValues }) => {
    const filteredData = data.filter(filterCallback)

    return (
        <>
        <Export onClick={() => exportToPdf(fields, filteredData)}> Exportar Lista </Export>
        <Table>
            <thead>
                <tr className='header'>
                    {
                        fields.map((field, index) =>
                            <th>
                                <span>{field.displayName || field.toUpperCase()}</span>
                                {showFilters &&
                                (<><br/>
                                    <input
                                        placeholder='Filtrar'
                                    value={filterValues[index]}
                                    onChange={(e) => { updateFilterValues(e, index) }}
                                /></>)}
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    filteredData.map(mapCallback)
                }
            </tbody>
        </Table>
        </>
    )
}

export default DataTable