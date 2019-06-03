export default {
    createFuncionario: (data) => {
        let funcionario = { flag_bloqueado: 0, }
        funcionario.id = data.id
        funcionario.pessoaId = data.pessoaId
        funcionario.cargo = data.cargo
        const { cpf, nome, login, senha, email, dataNascimento } = data
        funcionario.pessoa = {
            ...{ cpf, nome, login, senha, email, dataNascimento, id: data.pessoaId }
        }
        const { CEP, logradouro, numero, complemento, bairro, cidade, uf } = data
        funcionario.pessoa.endereco = [{
            ...{ CEP, logradouro, numero, complemento, bairro, cidade, uf }
        }]
        const { DDD = 21, numero_telefone, tipo = 'celular' } = data
        funcionario.pessoa.telefone = [{
            ...{ DDD, numero_telefone, tipo }
        }]
        // debugger
        return funcionario
    }
}