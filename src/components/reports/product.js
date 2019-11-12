import React, { useState } from 'react'
import styled from 'styled-components'
import {InputWithLabel} from "../base";
import Select from "../select";
import {TIPOS_PRODUTO} from "../../util/constants";
import InputRow from "../base/form/InputRow";
import BaseForm from "../base/form";
import {ButtonOrSpinner} from "../base/button";
import axios from "axios";
import {setLoading, setNotLoading} from "../../actions";
import {connect} from "react-redux";
import {params} from "../../util/request";
import DataTable from "../admin/sections/DataTable";
import { formatMoney } from '../../util/string';

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

const ProductReport = ({
    setIsLoading,
    setIsNotLoading
}) => {
    const [tipoProduto, setTipoProduto] = useState(TIPOS_PRODUTO[0].value)
    const [dataInicial, setDataInicial] = useState('')
    const [dataFinal, setDataFinal] = useState('')
    const [dataSet, setDataSet] = useState([])
    const onChangeTipoProduto = event => {
        setTipoProduto(event.target.value)
    }
    const total = dataSet.reduce((acc, curr) => acc + curr.receita, 0)
    const fields = [ 'nome', 'qtd_pedidos', 'qtd_vendido', 'receita', 'percentual' ]
    const mapCallback = reportRow => (
        <tr key={reportRow.id}>
            {fields.map(field => {
                if (field === 'percentual') {
                    return <td key={`${field}-${reportRow.nome}`}>{(reportRow.receita/total * 100).toFixed(2)}%</td>
                }
                return <td key={`${field}-${reportRow.nome}`}>{field === 'receita' ? `R$ ${formatMoney(reportRow[field])}` : reportRow[field]}</td>
            })}
        </tr>
    )
    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsLoading()
        if (tipoProduto && dataInicial && dataFinal) {
            const url = `https://med-backend-dev.herokuapp.com/info/vendas/produtos/${tipoProduto}/${dataInicial}/${dataFinal}`
            axios.get(url, params)
                .then(response => response.data)
                .then(data => {
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
                    <Select
                        label='Tipo de produto'
                        objectList={TIPOS_PRODUTO}
                        fieldForValue={'value'}
                        fieldForLabel={'label'}
                        onChangeValue={onChangeTipoProduto}
                        value={tipoProduto}
                    />
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
            <DataTable
                data={dataSet}
                fields={fields}
                mapCallback={mapCallback}
            />
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

export default connect(() => {}, mapDispatchToProps)(ProductReport)