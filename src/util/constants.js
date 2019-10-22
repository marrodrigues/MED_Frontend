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

export { PATHS, ALLOWED_CITY, ALLOWED_DISTRICTS, FORM_INPUT_IDS, KEYS, FOOTER_TABS }