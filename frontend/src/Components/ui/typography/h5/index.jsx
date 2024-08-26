import React from 'react'

const H5 = ({ children, className , ...others }) => {
    return (
        <h5 className={` text-sm font-medium ${className}`} {...others}>{children}</h5>
    )
}

export default H5