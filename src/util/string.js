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

export { formatCep }