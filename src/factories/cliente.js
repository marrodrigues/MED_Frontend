export default {
    createCliente: (data) => {
        let cliente = { flag_bloqueado: 0 }
        cliente.id = data.id
        cliente.pessoaId = data.pessoaId
        const { cpf, nome, login, senha, email, dataNascimento } = data
        cliente.pessoa = {
            ...{ cpf, nome, login, senha, email, dataNascimento, id: data.pessoaId }
        }
        const { CEP, logradouro, numero, complemento, bairro, cidade, uf } = data
        cliente.pessoa.endereco = [{
            ...{ CEP, logradouro, numero, complemento, bairro, cidade, uf }
        }]
        const { DDD = 21, numero_telefone, tipo = 'celular' } = data
        cliente.pessoa.telefone = [{
            ...{ DDD, numero_telefone, tipo }
        }]
        // // debugger
        return cliente
    }
}