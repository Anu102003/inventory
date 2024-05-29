import React from 'react'
export const InputContainer = ({ type, name, placeholder, value, handleChange }) => {
    return (
        <div className='form-fields'>
            <p className='label'>{placeholder} :</p>
            <input type={type}
                name={name}
                placeholder={placeholder}
                value={value === "" ? "" : value}
                onChange={handleChange}
                autoComplete='off' />
        </div>
    )
}
