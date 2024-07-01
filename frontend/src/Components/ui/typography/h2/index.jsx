import React from 'react'

const H2 = ({ children, className , ...others}) => {
    return (
        <h2 className={` text-xl md:text-2xl font-medium ${className}`} {...others}>{children}</h2>
    )
}

export default H2