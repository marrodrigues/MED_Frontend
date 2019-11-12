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

const formatMoney = (number, decPlaces, decSep, thouSep) => {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
    decSep = typeof decSep === "undefined" ? "," : decSep;
    thouSep = typeof thouSep === "undefined" ? "." : thouSep;
    let sign = number < 0 ? "-" : "";
    let i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    let j = i.length 
    j = j > 3 ? j % 3 : 0;
    
    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
    }

export { formatCep, capitalize, getValuesFromQueryString, formatCpf, formatMoney }