export default {
    createLote: (data) => {
        const { id, qtd, validade, valor_total, insumoId } = data
        let loteObj = { qtd, validade, valor_total, insumoId }
        return id ? { ...loteObj, id } : loteObj
    }
}