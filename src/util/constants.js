const PATHS = {
    LOGIN: 'login/',
    LOGOUT: 'logout/',
    USERS: 'clientes/',
}

const KEYS = {
    TOKEN: 'tokenMED'
}

const ALLOWED_DISTRICTS = [
    'Curicica',
    'Jacarepaguá',
    'Freguesia (Jacarepaguá)',
    'Anil',
    'Cidade de Deus',
    'Gardênia Azul',
    'Praça Seca',
    'Pechincha',
    'Tanque',
    'Taquara',
]

const ALLOWED_CITY = 'Rio de Janeiro'

const FORM_INPUT_IDS = {
    NOME: 'nome',
    CEP: 'CEP',
    CPF: 'cpf',
    LOGIN: 'login',
    NASCIMENTO: 'dataNascimento',
    NUMERO: 'numero',
    UF: 'uf',
    TELEFONE: 'numero_telefone',
    SENHA: 'senha',
    EMAIL: 'email',
    LOGRADOURO: 'logradouro',
    BAIRRO: 'bairro',
    CIDADE: 'cidade',
    COMPLEMENTO: 'complemento',
    DESCRICAO: 'descricao',
    QTD_UNID: 'qtd_unid',
    UNIDADE: 'unidade',
    VALOR_UNITARIO: 'valor_unitario',
    VALIDADE: 'validade',
    QUANTIDADE: 'qtd',
    LOTE: 'lote',
    TAMANHO: 'tamanho',
    VALOR: 'valor',
    CARGO: 'cargo',
}

const FOOTER_TABS = ['Login', 'Cadastro']

const PESSOA_DEFAULT_VALUE = {
    pessoa: {
        endereco: [{}],
        telefone: [{}]
    }
}

const ADMIN_TABS = ['Lista', 'Formulário']

const REPORT_TABS = ['Produto', 'Cliente']

const CLIENT_FIELDS = [{
    name: 'nome',
    displayName: 'Nome'
}, {
    name: 'email',
    displayName: 'E-mail'
}, {
    name: 'cpf',
    displayName: 'CPF'
}, {
    name: 'login',
    displayName: 'Login'
}];

const TIPOS_PRODUTO = [
    { value: '1', label: 'Pizza'},
    { value: '2', label: 'Bebida'},
]


export {
    PATHS,
    ALLOWED_CITY,
    ALLOWED_DISTRICTS,
    FORM_INPUT_IDS,
    KEYS,
    FOOTER_TABS,
    PESSOA_DEFAULT_VALUE,
    ADMIN_TABS,
    CLIENT_FIELDS,
    REPORT_TABS,
    TIPOS_PRODUTO,
}