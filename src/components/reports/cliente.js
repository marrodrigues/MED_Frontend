import React, { useState } from 'react'
import styled from 'styled-components'
import {InputWithLabel} from "../base";
import Select from "../select";
import {CLIENT_REPORT_FIELDS} from "../../util/constants";
import InputRow from "../base/form/InputRow";
import BaseForm from "../base/form";
import {ButtonOrSpinner} from "../base/button";
import axios from "axios";
import {setLoading, setNotLoading} from "../../actions";
import {connect} from "react-redux";
import {params} from "../../util/request";
import DataTable from "../admin/sections/DataTable";
import { formatMoney } from '../../util/string';
import Chart from "../Chart";
import {getOptionsForComparativeChart} from "../../util/graficaodomal";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    input {
        max-width: 200px;
    }
`
const Total = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-left: auto;
`

const ClientReport = ({
    setIsLoading,
    setIsNotLoading
}) => {
    const [dataInicial, setDataInicial] = useState('')
    const [dataFinal, setDataFinal] = useState('')
    const [dataSet, setDataSet] = useState([])
    const [charDataSet, setChartDataSet] = useState([])
    const mapCallback = reportRow => (
        <tr key={reportRow.id}>
            {CLIENT_REPORT_FIELDS.map(field => {
                if (field.name === 'percentual') {
                    return <td key={`${field.name}-${reportRow.nome}`}>{(reportRow.receita / total * 100).toFixed(2)}%</td>
                }
                return <td key={`${field.name}-${reportRow.nome}`}>{field.name === 'receita' ? `R$ ${formatMoney(reportRow[field.name])}` : reportRow[field.name]}</td>
            })}
        </tr>
    )
    const total = dataSet.reduce((acc, curr) => acc + curr.receita, 0)
    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsLoading()
        if (dataInicial && dataFinal) {
            const url = `https://med-backend-dev.herokuapp.com/info/vendas/clientes/${dataInicial}/${dataFinal}`
            axios.get(url, params)
                .then(response => response.data)
                .then(data => {
                    const chartdata = data.map(entry => ({ nome: entry.cpf, receita: entry.receita}))
                    console.log(chartdata)
                    setChartDataSet(chartdata)
                    setDataSet(data)
                    if (data.length === 0) {
                        alert('Não há entradas no período selecionado')
                    }
                })
                .catch(error => {
                    debugger
                    console.log(JSON.stringify(error))
                    alert('Algo de errado aconteceu')
                })
                .finally(() => {
                    setIsNotLoading()
                })
        } else {
            alert('Preencha todas as informações')
            setIsNotLoading()
        }
    }
    return (
        <Container>
            <BaseForm onSubmit={onSubmit}>
                <InputRow>
                    <InputWithLabel
                        label='Data Inicial'
                        value={dataInicial}
                        onChange={setDataInicial}
                        type='date'
                    />
                    <InputWithLabel
                        label='Data Final'
                        value={dataFinal}
                        onChange={setDataFinal}
                        type='date'
                    />
                    <ButtonOrSpinner label='Gerar'/>
                </InputRow>
            </BaseForm>
            {dataSet.length > 0
            ? <Chart
                option={getOptionsForComparativeChart(charDataSet)}
                style={{width: '850px'}}
            />
            : null}
            {dataSet.length > 0
            ? <DataTable
                data={dataSet}
                fields={CLIENT_REPORT_FIELDS}
                mapCallback={mapCallback}
            />
            : null}
            {
                total !== 0
                ? <Total>Receita Total: R$ {formatMoney(total)}</Total>
                : null
            }
        </Container>
    )
};

const mapDispatchToProps = dispatch => ({
    setIsLoading: () => {
        dispatch(setLoading())
    },
    setIsNotLoading: () => {
        dispatch(setNotLoading())
    }
})

export default connect(() => {}, mapDispatchToProps)(ClientReport)