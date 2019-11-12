import React from 'react'
import styled from 'styled-components'
import DataTable from "../admin/sections/DataTable";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormTitle from "../base/form/FormTitle";
import {BaseButton} from "../base";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const DisplayProducts = styled.div`
    display: flex;
`
const ProductField = styled.span`
    padding: 1vh 1vw;
`

const Total = styled.div`
    font-size: 16px;
    font-weight: bold;
    // margin-left: auto;
`

const Carrinho = ({
    carrinho,
    changeQtd,
    makeOrder,
}) => {
    const total = carrinho.reduce((acc, curr) => acc + (curr.valor * curr.qtd), 0)
    const fields = ['nome', 'valor', '-' ,'qtd', '+']
    const mapCallback = product => (
        <tr key={product.nome} onClick={() => { }}>
            {fields.map(field => {
                if (field === '-') {
                    return <td key={`${field}-${product.nome}`} onClick={() => {changeQtd(product, -1)}} style={{textAlign:'center'}}><RemoveCircleOutlineIcon/></td>
                }
                if (field === '+') {
                    return <td key={`${field}-${product.nome}`} onClick={() => {changeQtd(product, 1)}} style={{textAlign:'center'}}><AddCircleOutlineIcon/></td>
                }
                return <td key={`${field}-${product.nome}`}>{product[field]}</td>
            })}
        </tr>
    )
    return (
        <Container>
            {/*{*/}
            {/*    carrinho.map(product => (*/}
            {/*        <DisplayProducts>*/}
            {/*            <ProductField>{product.nome}</ProductField>*/}
            {/*            <ProductField>{product.valor}</ProductField>*/}
            {/*            <ProductField>{product.qtd}</ProductField>*/}
            {/*        </DisplayProducts>*/}
            {/*    ))*/}
            {/*}*/}
            {carrinho.length > 0
            ? <DataTable
                data={carrinho}
                fields={fields}
                mapCallback={mapCallback}
            />
            : null}
            {
                total === 0
                ? <FormTitle title='Seu carrinho está vazio'/>
                : <>
                    <Total>Total: {total}</Total>
                    <BaseButton onClick={makeOrder}>Fazer pedido</BaseButton>
                </>
            }
        </Container>
    )
}
export default Carrinho