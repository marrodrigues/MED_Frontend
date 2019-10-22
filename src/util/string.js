const formatCep = (unformattedCep) => {
    const digits = removeNonNumericDigits(unformattedCep)
    let formattedCep = ''
    for (let digit of digits) {        
        formattedCep += formattedCep.length === 5 ? '-' + digit : digit
    }
    return formattedCep
}

const removeNonNumericDigits = (str) => {
    return str.replace(/[^\d]/g, '')
}

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLocaleLowerCase();

const getValuesFromQueryString = () => {
    if (window.location.search) { 
        return window.location.search
            .replace('?', '')
            .split('&')
            .reduce((acc, cur) => {
                const [key, value] = cur.split('=')
                acc[key] = value
                return acc
            }, {})
    }
    return {}
}

export { formatCep, capitalize, getValuesFromQueryString }