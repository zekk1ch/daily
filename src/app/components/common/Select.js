import React from 'react';
import ReactSelect from 'react-select';

function Select(props) {
    let value;
    if (props.value && props.options) {
        value = props.options.find((option) => option.value === props.value);
    }

    let onChange;
    if (props.onChange) {
        onChange = ({ value }) => {
            props.onChange(value);
        };
    }

    return (
        <ReactSelect
            {...props}
            value={value}
            onChange={onChange}
        />
    );
}

export default Select;
