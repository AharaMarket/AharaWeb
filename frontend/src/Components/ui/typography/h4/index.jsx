import React from 'react'

const H4 = ({ children, className, ...others }) => {
    return (
        <h4 className={`  text-sm md:text-base font-normal text-custom-black  ${className}`} {...others}>{children}</h4>
    )
}

export default H4