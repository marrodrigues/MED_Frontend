export default {
    createLote: (data) => {
        const { id, lote, qtd, validade, valor_unitario, insumoId, produtoId } = data
        console.log(data)
        let loteObj = { lote, qtd: Number(qtd), validade, valor_unitario: Number(valor_unitario) }
        if (insumoId) { loteObj.insumoId = insumoId }
        if (produtoId) { loteObj.produtoId = produtoId }
        return id ? { ...loteObj, id } : loteObj
    }
}