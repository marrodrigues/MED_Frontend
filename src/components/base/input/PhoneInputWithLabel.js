import React from "react";
import {InputWithLabel} from "../index";
import {formatPhone} from "../../../util/string";

const PhoneInputWithLabel = ({
    onChange,
    value,
    ...props
}) => {
    return (
        <InputWithLabel
            {...props}
            label='Telefone'
            value={formatPhone(value)}
            onChange={onChange}
            maxLength={15}
        />
    )
}

export default PhoneInputWithLabel