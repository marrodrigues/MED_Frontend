import {setLoading, setNotLoading} from "../../../actions";
import {connect} from "react-redux";
import React, {useState} from "react";
import {validateLote} from "../../../util/validation";
import {InputWithLabel} from "../index";

const LoteInputWithLabel = ({
    setIsLoading,
    setIsNotLoading,
    loteExistsCallback = () => {},
    loteNotFoundCallback = () => {},
    onChange,
    value,
    ...props
}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const onBlur = e => {
        setIsLoading()
        const lote = e.target.value
        validateLote(lote)
            .then(response => response.data)
            .then(data => {
                loteExistsCallback(data)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    loteNotFoundCallback()
                } else {
                    console.log(JSON.stringify(error))
                }
            })
            .finally(() => {
                setIsNotLoading()
            })
    }
    return (
        <InputWithLabel
            {...props}
            label='Lote'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}

const mapDispatchToProps = dispatch => ({
    setIsLoading: () => {
        dispatch(setLoading())
    },
    setIsNotLoading: () => {
        dispatch(setNotLoading())
    }
})

export default connect(() => {}, mapDispatchToProps)(LoteInputWithLabel)