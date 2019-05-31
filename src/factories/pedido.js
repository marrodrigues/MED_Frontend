import ProdutoFactory from './'

export default {
    createPedido: (data) => {
        const { id, status, forma_pagamento, motivo_cancelamento = null, data_pedido, valor_total, observacao = null, clienteId = null, funcionarioId = null, produtos } = data
        let pedido = { status, forma_pagamento, motivo_cancelamento, data_pedido, valor_total, observacao, clienteId, funcionarioId }
        if (produtos && Array.isArray(produtos)) {
            pedido.produtos = produtos.map(produto => ProdutoFactory.createProduto(produto))
        }
        return id ? { ...pedido, id } : pedido
    }
}