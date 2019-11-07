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

const formatCpf = (unformattedCpf) => {
    const digits = removeNonNumericDigits(unformattedCpf)
    let formattedCpf = ''
    for (let digit of digits) {
        if (formattedCpf.length === 3 || formattedCpf.length === 7) {
            formattedCpf += '.'
        }
        if (formattedCpf.length === 11) {
            formattedCpf += '-'
        }
        formattedCpf += digit
    }
    return formattedCpf
}
// const formatPhone = (unformattedPhone) => {
//     const digits = removeNonNumericDigits(unformattedPhone)
//     let formattedPhone = ''
//     for (let digit of digits) {
//         if (formattedPhone.length === 0) {
//             formattedPhone += '('
//         }
//         if (formattedPhone.length === 3) {
//             formattedPhone += ')'
//         }


//     }
// }

export { formatCep, capitalize, getValuesFromQueryString, formatCpf }