import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {InputWithLabel} from "../base";
import Select from "../select";
import {TIPOS_PRODUTO} from "../../util/constants";
import InputRow from "../base/form/InputRow";
import BaseForm from "../base/form";
import BaseButton, {ButtonOrSpinner} from "../base/button";
import axios from "axios";
import {setLoading, setNotLoading} from "../../actions";
import {connect} from "react-redux";
import {params} from "../../util/request";
import DataTable from "../admin/sections/DataTable";
import Chart from "../Chart";
import {getOptionsForComparativeChart} from "../../util/graficaodomal";
import { formatMoney } from '../../util/string';
import Checkbox from "../base/input/Checkbox";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    input {
        max-width: 200px;
    }
`

const StyledInputRow = styled(InputRow)`
    min-width: 800px; 
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
    const [dataSet2, setDataSet2] = useState([])
    const [compare, setCompare] = useState(false)
    const onChangeTipoProduto = event => {
        setTipoProduto(event.target.value)
    }
    const [drawChart, setDrawChart] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setDrawChart(true)
        }, 100)
    }, [drawChart])
    const handleCheckboxChange = event => {
        const checkbox = event.target.checked
        setDataFinal('')
        setDataSet2([])
        setCompare(checkbox)
        if (!checkbox) {
            setDrawChart(false)
        }
    }
    const total = dataSet.reduce((acc, curr) => acc + curr.receita, 0)
    const total2 = dataSet2.reduce((acc, curr) => acc + curr.receita, 0)
    // const fields = [ 'nome', 'qtd_pedidos', 'qtd_vendido', 'receita', 'percentual' ]
    // const mapCallback = reportRow => (
    //     <tr key={reportRow.id}>
    //         {fields.map(field => {
    //             if (field === 'percentual') {
    //                 return <td key={`${field}-${reportRow.nome}`}>{(reportRow.receita/total * 100).toFixed(2)}%</td>
    //             }
    //             return <td key={`${field}-${reportRow.nome}`}>{field === 'receita' ? `R$ ${formatMoney(reportRow[field])}` : reportRow[field]}</td>
    //         })}
    //     </tr>
    // )
    const onSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsLoading()
        const [anoPeriodo1, mesPeriodo1] = dataInicial.split('-')
        const [anoPeriodo2, mesPeriodo2] = dataFinal.split('-')

        if (tipoProduto && (anoPeriodo1 && mesPeriodo1)) {
            if (!(anoPeriodo2 && mesPeriodo2)) {
                // primeiros dados
                const url = `https://med-backend-dev.herokuapp.com/info/vendas/produtos/${tipoProduto}/${mesPeriodo1}/${anoPeriodo1}`
                console.log(url)
                axios.get(url, params)
                    .then(response => response.data)
                    .then(data => {
                        console.log(data)
                        setDataSet(data)
                    })
                    .catch(error => {
                        debugger
                        console.log(JSON.stringify(error))
                        if (error.message.includes('code 404')) {
                            alert('Não há entradas no período selecionado')
                            setDataSet([])
                        } else {
                            alert('Algo de errado aconteceu')
                        }
                    })
                    .finally(() => {
                        setIsNotLoading()
                    })
            } else {
                // dados comparativos
                const url = `https://med-backend-dev.herokuapp.com/info/vendas/produtos/${tipoProduto}/${mesPeriodo2}/${anoPeriodo2}`
                console.log(url)
                let body = dataSet.map(product => product.id)
                if (body.length < 5) {
                    body.concat(Array(5 - body.length).fill(1))
                }
                axios.get(url, {...params, body})
                    .then(response => response.data)
                    .then(data => {
                        // debugger
                        // console.log(data)
                        const productToCompare = dataSet.map(entry => entry.nome)
                        const dataToInclude = data
                            .filter(product => productToCompare.includes(product.nome))
                            .map(entry => ({ nome: entry.nome, receita: entry.receita}))
                        let chartdata2 = []
                        dataSet.forEach((entry, index) => {
                            const dataToCompare = dataToInclude.find(_entry => _entry.nome === entry.nome)
                            console.log(dataToCompare, dataToInclude)
                            chartdata2.push(dataToCompare || { nome: entry.nome, receita: 0})
                        })
                        setDataSet2(chartdata2)

                    })
                    .catch(error => {
                        // debugger
                        console.log(JSON.stringify(error))
                        if (error.message.includes('code 404')) {
                            alert('Não há entradas no período selecionado')
                            setDataSet2([])
                        } else {
                            alert('Algo de errado aconteceu')
                        }
                    })
                    .finally(() => {
                        setIsNotLoading()
                    })
            }
        } else {
            alert('Preencha todas as informações')
            setIsNotLoading()
        }
    }
    const onClickLimpar = () => {
        setCompare(false)
        setDataFinal('')
        setDataInicial('')
        setDataSet2([])
        setDataSet([])
    }
    return (
        <Container>
            <BaseForm onSubmit={onSubmit}>
                <StyledInputRow>
                    <Select
                        label='Tipo de produto'
                        objectList={TIPOS_PRODUTO}
                        fieldForValue={'value'}
                        fieldForLabel={'label'}
                        onChangeValue={onChangeTipoProduto}
                        value={tipoProduto}
                        disabled={compare}
                    />
                    <InputWithLabel
                        label={`Período ${compare && dataSet.length ? '1' : ''}`}
                        value={dataInicial}
                        onChange={setDataInicial}
                        type='month'
                        disabled={compare}
                    />
                    {dataSet.length > 0 && <Checkbox
                        checked={compare}
                        onChange={handleCheckboxChange}
                        label='Comparar'
                    />}
                    {
                        compare &&
                        <InputWithLabel
                            label='Período 2'
                            value={dataFinal}
                            onChange={setDataFinal}
                            type='month'
                        />
                    }
                    <ButtonOrSpinner label='Gerar'/>
                    {
                        dataSet.length > 0 && <BaseButton onClick={onClickLimpar}>Limpar</BaseButton>
                    }
                </StyledInputRow>
            </BaseForm>
            {/*Titulo do grafico*/}
            {drawChart && dataSet.length > 0
            ? <Chart
                option={getOptionsForComparativeChart(dataSet, dataSet2)}
                style={{width: '850px'}}
            />
            : null}

            {/*<DataTable*/}
            {/*    data={dataSet}*/}
            {/*    fields={fields}*/}
            {/*    mapCallback={mapCallback}*/}
            {/*/>*/}
            {
                total !== 0
                ? <Total>{compare ? 'Período 1' : ''} Receita Total: R$ {formatMoney(total)}</Total>
                : null
            }
            {
                total2 !== 0
                ? <Total>Período 2 Receita Total: R$ {formatMoney(total2)}</Total>
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

export default connect(() => ({}), mapDispatchToProps)(ProductReport)