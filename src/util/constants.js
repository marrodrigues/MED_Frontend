const PATHS = {
    LOGIN: 'login/',
    USERS: 'clientes/'
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
    CEP: 'cep',
    CPF: 'cpf',
    LOGIN: 'login',
    NASCIMENTO: 'nascimento',
    NUMERO: 'numero',
    UF: 'uf',
    TELEFONE: 'telefone',
    SENHA: 'senha',
    EMAIL: 'email',
    LOGRADOURO: 'logradouro',
    BAIRRO: 'bairro',
    CIDADE: 'cidade',
    COMPLEMENTO: 'complemento'
}

export { PATHS, ALLOWED_CITY, ALLOWED_DISTRICTS, FORM_INPUT_IDS, KEYS }