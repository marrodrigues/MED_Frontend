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

const REPORT_TABS = ['Produto', 'Cliente', 'Funcionário']

const ORDER_TABS = ['Novo', 'Carrinho', 'Lista']

const MY_ORDERS_TABS = ['Novo', 'Carrinho', 'Histórico']

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

const EMPLOYEE_FIELDS = [{
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
}, {
    name: 'cargo',
    displayName: 'Cargo'
}];

const SUPPLY_FIELDS = [{
    name: 'descricao',
    displayName: 'Descrição'
}, {
    name: 'qtd_unid',
    displayName: 'Qtd./Unidade'
}, {
    name: 'unidade',
    displayName: 'Unidade'
}]

const BUNDLE_FIELDS =[{
    name: 'lote',
    displayName: 'Lote'
}, {
    name: 'qtd',
    displayName: 'Quantidade'
}, {
    name: 'validade',
    displayName: 'Validade'
}, {
    name: 'insumoproduto',
    displayName: 'Insumo/Produto'
}, {
    name: 'valor_unitario',
    displayName: 'Valor Unitário'
}]

const ORDER_FIELDS = [{
    name: 'codigo',
    displayName: 'Código'
}, {
    name: 'status',
    displayName: 'Status'
}, {
    name: 'data_pedido',
    displayName: 'Data do Pedido'
}, {
    name: 'valor_total',
    displayName: 'Valor Total'
}, {
    name: 'forma_pagamento',
    displayName: 'Forma de Pagamento'
}, {
    name: 'observacao',
    displayName: 'Observação'
}]

const PRODUCT_FIELDS = [{
    name: 'nome',
    displayName: 'Nome'
}, {
    name: 'tamanho',
    displayName: 'Tamanho'
}, {
    name: 'valor',
    displayName: 'Valor'
}]

const CLIENT_REPORT_FIELDS = [
    {name: 'nome', displayName: 'Nome'},
    {name: 'cpf', displayName: 'CPF'},
    {name: 'qtd_pedidos', displayName: 'Quantidade de pedidos'},
    {name: 'receita', displayName: 'Receita'},
    {name: 'percentual', displayName: 'Percentual'},
]

const STATUSES = [
    {value: '1', label: 'Em confecção'},
    {value: '2', label: 'Entregando'},
    {value: '3', label: 'Vendido'},
    {value: '4', label: 'Cancelado'},
]

const TIPOS_PRODUTO = [
    { value: '1', label: 'Pizza'},
    { value: '2', label: 'Bebida'},
]

const ROLES = [
    {value: 'Admin', label: 'Administrador'},
    {value: 'Funcionario', label: 'Funcionário'}
]
const FORMAS_PAGAMENTO = [
    { value: '1', label: 'Dinheiro'},
    { value: '2', label: 'Débito'},
    { value: '3', label: 'Crédito'},
]
const emptyFunction = () => {}

const reloadWindow = () => {window.location.reload()}

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
    ORDER_TABS,
    MY_ORDERS_TABS,
    EMPLOYEE_FIELDS,
    SUPPLY_FIELDS,
    BUNDLE_FIELDS,
    ORDER_FIELDS,
    PRODUCT_FIELDS,
    ROLES,
    FORMAS_PAGAMENTO,
    STATUSES,
    CLIENT_REPORT_FIELDS,
    emptyFunction,
    reloadWindow,
}