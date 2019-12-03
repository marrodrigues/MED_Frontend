import React from 'react'
import { BaseForm } from '../base'
import PedidoForm from "./PedidoForm";
import {FORMAS_PAGAMENTO} from "../../util/constants";

const MeusPedidosForm = ({}) => {
    const handleSubmit = e => {

    }
    // return (
    //    <PedidoForm
    //        selectedOrder={selectedOrder}
    //         clientList={clientList.map(client => ({id: client.id, nome: client.pessoa.nome}))}
    //         employeeList={employeeList.map(employee => ({id: employee.id, nome: employee.pessoa.nome}))}
    //         productList={productList.filter(product => !carrinhoIds.includes(product.id))}
    //         addToCart={addToCart}
    //         codigo={codigo}
    //         setCodigo={setCodigo}
    //         forma_pagamento={forma_pagamento}
    //         setFormaPagamento={setFormaPagamento}
    //         formasDePagamento={FORMAS_PAGAMENTO}
    //         observacao={observacao}
    //         setObservacao={setObservacao}
    //         client={client}
    //         setClient={setClient}
    //         employee={employee}
    //         setEmployee={setEmployee}
    //         newOrder={newOrder}
    //         disabledByStatus={status > 1}
    //         onBlurCodigo={onBlurCodigo}
    //         clearOrder={clearOrder}
    //     />
    // )
}

export default MeusPedidosForm