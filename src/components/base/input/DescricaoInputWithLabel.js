import {setLoading, setNotLoading} from "../../../actions";
import {connect} from "react-redux";
import React, {useState} from "react";
import {validateDescricao} from "../../../util/validation";
import {InputWithLabel} from "../index";

const DescricaoInputWithLabel = ({
    setIsLoading,
    setIsNotLoading,
    descricaoExistsCallback = () => {},
    descricaoNotFoundCallback = () => {},
    onChange,
    value,
    ...props
}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const onBlur = e => {
        setIsLoading()
        const descricao = e.target.value
        validateDescricao(descricao)
            .then(response => response.data)
            .then(data => {
                descricaoExistsCallback(data)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    descricaoNotFoundCallback()
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
            label='Descrição'
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

export default connect(() => {}, mapDispatchToProps)(DescricaoInputWithLabel)