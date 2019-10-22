import InsumoFactory from './'

export default {
    createProduto: (data) => {
        const { id, nome, descricao = null, tamanho = null, valor, lote = null, validade = null, insumos } = data
        let produto = { nome, descricao, tamanho, valor, lote, validade }
        if (insumos && Array.isArray(insumos)) {
            produto.insumos = insumos.map(insumo => InsumoFactory.createInsumo(insumo))
        }
        return id ? { ...produto, id } : produto
    }
}