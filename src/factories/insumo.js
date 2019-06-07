import LoteFactory from './'

export default {
    createInsumo: (data) => {
        const { id, descricao, qtd_unid, unidade, /* valor_unitario, */ lotes } = data
        let insumo = { descricao, qtd_unid, unidade/* , valor_unitario */ }
        if (lotes && Array.isArray(lotes)) {
            insumo.lotes = lotes.map(lote => LoteFactory.createLote(lote))
        } 
        return id ? { ...insumo, id } : insumo
    }
}